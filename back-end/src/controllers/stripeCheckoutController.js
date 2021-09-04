const { Order } = require("../models/orders");
const { Product } = require("../models/products");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
    // Checkout session with Stripe
    async createCheckOutSessionWithStripe(req, res) {
        const {
            line_items,
            email,
            payment_method_types,
            tax,
            shippingCost,
            currency,
        } = req.body;
        const orderId = req.params.id;
        console.log(currency);
        // add Shipping
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Shipping Fee",
                    description: "standard shipping",
                },
                unit_amount: shippingCost * 100,
            },
            quantity: 1,
        });

        // add tax
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Tax",
                    description: "Tax",
                },
                unit_amount: tax * 100,
            },
            quantity: 1,
        });

        if (!email || !payment_method_types) {
            throw new Error("Email or payment method is required");
        }
        if (!shippingCost) {
            throw new Error("Shipping cost is missing");
        }

        try {
            const session = await stripe.checkout.sessions.create({
                line_items: line_items,
                customer_email: email,
                payment_method_types,
                payment_method_options: {
                    wechat_pay: {
                        client: "web",
                    },
                },

                // for guest checkout
                // shipping_rates: [process.env.STRIPE_SHIPPING_RATE_ID],
                // shipping_address_collection: {
                //   allowed_countries: ['HK', 'JP'],
                // }, /success?session_id={CHECKOUT_SESSION_ID}
                client_reference_id: orderId,
                mode: "payment",
                success_url: `${process.env.WEB_APP_URL}/order/${orderId}`,
                cancel_url: `${process.env.WEB_APP_URL}/order/${orderId}`,
            });
            res.status(200).send(session.id);
        } catch (error) {
            res.status(400).send({
                message:
                    "An error occured, unable to create a checkout session, please try again or contact us",
            });
        }
    },
    async webhookStripe(req, res) {
        const event = req.body;
        switch (event.type) {
            case "checkout.session.completed":
                const checkoutSession = event.data.object;
                // Update the order
                const {
                    id,
                    client_reference_id, // orderId
                    customer_email,
                    payment_status,
                } = checkoutSession;

                try {
                    const updateOrder = await Order.findById(
                        client_reference_id
                    );

                    let order = updateOrder.orderItems;

                    for (let i = 0; i < order.length; i++) {
                        const product = await Product.findById(
                            order[i].productId
                        );

                        for (let j = 0; j < product.size.length; j++) {
                            if (product.size[j].sizeType === order[i].size) {
                                for (
                                    let k = 0;
                                    k < product.size[j].colors.length;
                                    k++
                                ) {
                                    if (
                                        product.size[j].colors[k].color.en ===
                                            order[i].color ||
                                        product.size[j].colors[k].color.cn ===
                                            order[i].color ||
                                        product.size[j].colors[k].color.jpn ===
                                            order[i].color
                                    ) {
                                        console.log(
                                            product.size[j].colors[k].count
                                        );
                                        product.size[j].colors[k].count -=
                                            order[i].qty;
                                        console.log("-------");
                                        await product.save();
                                        console.log(
                                            product.size[j].colors[k].count
                                        );
                                    }
                                }
                            }
                        }
                    }

                    // update order info
                    updateOrder.paymentResult = {
                        id: id,
                        status: payment_status,
                        update_time: Date.now(),
                        email_address: customer_email,
                        provider: "Stripe",
                    };

                    updateOrder.isPaid = true
                        ? payment_status === "paid"
                        : false;
                    updateOrder.paidAt = Date.now();
                    await updateOrder.save();

                    // const updateUser = await User.findById(updateOrder.user.userId)
                    // updateUser.orderHistory.push(client_reference_id)
                    // await updateUser.save()

                    // Future email support
                } catch (error) {
                    res.send({ message: error.message });
                }

                console.log("Checkout session was successful");
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        res.json({ received: true });
    },
};
