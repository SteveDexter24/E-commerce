# Wishing Tree Limited Online Store API

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
      default: 'user',
    },
    memberShip: {
      type: String,
      default: 'member',
      required: true,
    },
    language: {
      type: String,
      required: true,
      default: 'en',
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
    creditCardNum: {
      type: String,
      trim: true,
    },
    creditCardName: {
      type: String,
      trim: true,
    },
    contactNum: {
      type: String,
      trim: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
    },
    orderHistory: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    likedProducts: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
  { timestamps: true },
)
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
            default: "https://semantic-ui.com/images/wireframe/image.png",
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
    },
    washing_care: {
        type: String,
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
                    image: {
                        type: String,
                        required: true,
                        default:
                            "https://semantic-ui.com/images/wireframe/image.png",
                    },
                },
            ],

        },
    ],

    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
});
```

### Order Schema

```
const orderSchema = new mongoose.Schema(
  {
    user: {
      username: { type: String },
      userId: { type: Schema.Types.ObjectId },
      name: { type: String, required: true },
      surname: { type: String, required: true },
      email: { type: String, required: true },
      contactNum: { type: String, required: true },
    },

    orderItems: [
      {
        productName: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'products',
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

    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_items: { type: String },
      email_address: { type: String },
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

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    paidAt: {
      type: Data,
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
    },

    creditCardNum: {
      type: String,
    },
    discounted: {
      type: String,
    },
  },
  { timestamps: true },
)
```
