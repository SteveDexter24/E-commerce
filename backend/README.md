# E-Commerce Online Store API

## Prerequisites

-   Node.js
-   npm

## Install npm modules

Install dependencies

```
npm install
```

## Run Locally

In the Backend directory, run this command to start the node.js server

```
node index.js or
nodemon index.js

```

## Data Schema

### User Schema

```
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        surname: {
            type: String,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 20,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
        role: {
            type: String,
            required: true,
            default: "user",
        },
        memberShip: {
            type: String,
            default: "member",
            required: true,
        },
        language: {
            type: String,
            required: true,
            default: "en",
        },
        location: {
            type: Array,
        },
        address1: {
            type: String,
            trim: true,
        },
        address2: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
        billingAddress: {
            type: String,
            trim: true,
        },
        contactNum: {
            type: String,
            trim: true,
        },
        cart: [
            {
                productId: { type: Schema.Types.ObjectId },
                name: { type: String },
                description: { type: String },
                image: [{ type: String }],
                price: { type: String },
                discount: { type: String },
                size: { type: String },
                qty: { type: Number },
                color: { type: String },
                totalSize: { type: Number },
            },
        ],
        orders: [
            {
                type: Schema.Types.ObjectId,
                ref: "orders",
            },
        ],

        createdAt: {
            type: Date,
            default: Date.now(),
            required: true,
        },
    },
    { timestamps: true }
);
```

### Product Schema

```
const productSchema = new mongoose.Schema({
  productName: {
    en: helper.productNameObj,
    cn: helper.productNameObj,
    jpn: helper.productNameObj,
  },
  category: {
    en: helper.categoryObj,
    cn: helper.categoryObj,
    jpn: helper.categoryObj,
  },
  gender: {
    type: String,
    required: true,
  },

  image: [
    {
      type: String,
      required: true,
      default: 'https://semantic-ui.com/images/wireframe/image.png',
    },
  ],
  feature: {
    en: helper.featureObj,
    cn: helper.featureObj,
    jpn: helper.featureObj,
  },
  description: {
    en: helper.descriptionObj,
    cn: helper.descriptionObj,
    jpn: helper.descriptionObj,
  },
  style: {
    en: helper.styleObject,
    cn: helper.styleObject,
    jpn: helper.styleObject,
  },

  price: {
    hkd: helper.priceObject,
    jpn: helper.priceObject,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  material: {
    type: String,
    trim: true,
  },
  washing_care: {
    type: String,
    trim: true,
  },
  discount: {
    hkd: helper.discountObject,
    jpn: helper.discountObject,
  },

  size: [
    {
      sizeType: {
        type: String,
        required: true,
      },

      colors: [
        {
          colorHex: {
            type: String,
          },
          color: {
            en: helper.colorObject,
            cn: helper.colorObject,
            jpn: helper.colorObject,
          },
          count: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],

  colors: [{ type: String }],

  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
})
```

### Order Schema

```
const orderSchema = new mongoose.Schema(
    {
        user: {
            username: { type: String },
            userId: { type: Schema.Types.ObjectId, ref: "users" },
            name: { type: String, required: true },
            surname: { type: String, required: true },
            email: { type: String, required: true },
            contactNum: { type: String, required: true },
        },

        orderItems: [
            {
                name: { type: String, required: true, trim: true },
                qty: { type: Number, required: true },
                image: [{ type: String, required: true }],
                size: { type: String, required: true, trim: true },
                color: { type: String, required: true, trim: true },
                colorHex: { type: String, trim: true },
                price: { type: String, required: true },
                discount: { type: String },
                description: { type: String, required: true },
                productId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "products",
                },
            },
        ],

        shippingAddress: {
            address1: { type: String, required: true },
            address2: { type: String, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true },
        },

        paymentMethod: {
            type: String,
            required: true,
        },

        currency: {
            type: String,
            required: true,
        },

        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
            provider: { type: String },
        },

        shippingCost: {
            type: Number,
            required: true,
            default: 0.0,
        },

        tax: {
            type: Number,
            required: true,
            default: 0.0,
        },

        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        itemsPrice: {
            type: Number,
            required: true,
        },

        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },

        paidAt: {
            type: Date,
        },

        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },

        deliveredAt: {
            type: Date,
        },

        deliveryMethod: {
            type: String,
            required: true,
            default: "Standard Delivery",
        },

        creditCardNum: {
            type: String,
        },
        discounted: {
            type: String,
        },
    },
    { timestamps: true }
);
```

## API

### Standard API

#### Authentication API

| Standard Method | HTTP Mapping | HTTP Request Body         | HTTP Response Body                     | HTTP Status Code | Authentication |
| --------------- | ------------ | ------------------------- | -------------------------------------- | ---------------- | -------------- |
| Post            | POST /signin  | username, password        | Status with user JSON object and token | 200/404/500      | N/A            |
| Post            | POST /signup | username, password, email | Status user JSON object and token      | 201/400/500      | N/A            |
| Post            | POST /signout | userId                    | Status                                 | 200/400/404/500  | user token     |

#### User API

| Standard Method | HTTP Mapping                  | HTTP Request Body | HTTP Response Body                     | HTTP Status Code | Authentication |
| --------------- | ----------------------------- | ----------------- | -------------------------------------- | ---------------- | -------------- |
| List            | GET /users                    | N/A               | user list (array of JSON object)       | 200/500          | admin token    |
| Get             | GET /user/{id}?               | userID            | user JSON object                       | 200/404/500      | user token     |
| Get             | GET /user/{id}/orders         | userID            | user orders JSON object                | 200/404/500      | user token     |
| Get             | GET /user/{id}/admin          | userID            | user JSON object                       | 200/404/500      | admin token    |
| Patch           | PATCH /user/{id}              | user JSON         | Status with user JSON object           | 200/400/404/500  | user token     |
| Patch           | PATCH /user/{id}/admin        | user JSON         | Status with user JSON object           | 200/400/404/500  | admin token    |
| Delete          | DELETE /user/{id}/admin       | N/A               | Status message                         | 200/404/500      | admin token    |

#### User API - Cart Actions

| Standard Method | HTTP Mapping                     | HTTP Request Body          | HTTP Response Body         | HTTP Status Code | Authentication |
| --------------- | -------------------------------- | -------------------------- | -------------------------- | ---------------- | -------------- |
| Post            | POST /user/{id}/move-cart-to-db  | cart items (array of JSON) | cart items (array of JSON) | 200/500          | user token     |
| Post            | POST /user/{id}/cart             | user ID cart item object   | cart items (array of JSON) | 200/404/500      | user token     |
| Patch           | PATCH /user/{id}/update-cart     | user ID and order items    | cart items (array of JSON) | 200/400/404/500  | user token     |
| Patch           | PATCH /user/{id}/remove          | user ID and order items    | cart items (array of JSON) | 200/400/404/500  | user token     |
| Patch           | PATCH /user/{id}/removeAll       | user ID                    | cart items (array of JSON) | 200/400/404/500  | user token     |


#### Product API

| Standard Method | HTTP Mapping               | HTTP Request Body | HTTP Response Body                         | HTTP Status Code | Authentication |
| --------------- | -------------------------- | ----------------- | ------------------------------------------ | ---------------- | -------------- |
| List            | GET /products              | N/A               | product list (array of JSON object)        | 200/500          | N/A            |
| Get             | GET /products/{id}         | product ID        | product JSON object                        | 200/404/500      | N/A            |
| Get             | GET /products/men          | product query     | men products (array of JSON object)        | 200/404/500      | N/A            |
| Get             | GET /products/women        | product query     | women products (array of JSON object)      | 200/404/500      | N/A            |
| Get             | GET /products/discount     | product query     | discounted products (array of JSON object) | 200/404/500      | N/A            |
| Get             | GET /products/kids         | product query     | kids products (array of JSON object)       | 200/404/500      | N/A            |
| Get             | GET /products/new-arrivals | N/A               | new products (array of JSON object)        | 200/404/500      | N/A            |
| Get             | GET /products-you-may-like | product query     | suggested products (array of JSON object)  | 200/404/500      | N/A            |
| Create          | POST /product              | product JSON      | Success or Fail Status                     | 201/400/500      | admin token    |
| Patch           | PATCH /product/{id}        | product JSON      | Success or Fail Status                     | 200/400/404/500  | admin token    |
| Delete          | DELETE /product/{id}       | product ID        | Status                                     | 200/404/500      | admin token    |

#### Order API

| Standard Method | HTTP Mapping                  | HTTP Request Body | HTTP Response Body                     | HTTP Status Code | Authentication |
| --------------- | ----------------------------- | ----------------- | -------------------------------------- | ---------------- | -------------- |
| List            | GET /order                    | order items JSON  | order items (array of JSON object)     | 200/500          | user token     |
| Get             | GET /order/{id}               | order ID          | order JSON object                      | 200/404/500      | user token     |
| Delete          | DELETE /order/{id}            | order ID          | Success or Fail Status                 | 200/404/500      | user token     |
| Get             | GET /orders                   | N/A               | order list (array of JSON Objects)     | 200/400/404/500  | admin token    |
| Patch           | PATCH /order{id}/deliver      | order ID          | Success or Fail Status                 | 200/400/404/500  | admin token    |


#### PayPal Checkout API

| Standard Method | HTTP Mapping                     | HTTP Request Body            | HTTP Response Body         | HTTP Status Code | Authentication |
| --------------- | -------------------------------- | ---------------------------- | -------------------------- | ---------------- | -------------- |
| Patch           | PATCH /order/{id}/pay            | paypal payment detail object | order item JSON            | 200/400/404/500  | user token     |
| Patch           | PATCH /config/paypal             | N/A                          | paypal token               | 200/400/404/500  | user token     |

#### Stripe Checkout API

| Standard Method | HTTP Mapping                            | HTTP Request Body            | HTTP Response Body         | HTTP Status Code | Authentication |
| --------------- | --------------------------------------- | ---------------------------- | -------------------------- | ---------------- | -------------- |
| Post            | POST /order/:id/create-checkout-session | Order Items (line_items)     | Stripe Checkout ID         | 200/400/404/500  | user token     |
| Post            | POST /webhook                           | payment.intent               | payment.intent statu       | 200/400/404/500  | user token     |



### Other Information

#### Setup Webhook for listening to payments via stripe

Please refer to [this documentation on installing Stripe CLI](https://github.com/stripe/stripe-cli)
Once you installed the Stripe CLI, run this command:

```
stripe listen --forward-to localhost:3001/webhook
```

Then, you shall see your webhook signing secret. Please add your secret to your .env (environment file).

#### For all api routes EXCEPT login and signup

HTTP Request Header:

```
Authorization: Bearer <token>
```