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
            required: true,
            trim: true,
        },
        surname: {
            type: String,
            required: true,
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
        address: {
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
        cart: {
            type: Schema.Types.ObjectId,
        },
        orderHistory: {
            type: Schema.Types.ObjectId,
        },
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
const orderSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  delivery_address: {
    type: String,
    required: true,
  },
  delivery_method: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  payment: {
    payment_type: {
      type: String,
    },
    cardNumber: {
      type: String,
    },
  },
  billingAddress: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  discounted: {
    type: String,
  },
})
```
