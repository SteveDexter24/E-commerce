# Wishing Tree Limited Online Store API

## Prerequisites

- Node.js
- npm

## Install npm modules

Install dependencies

```
npm install
```

## Run Locally

In the Backend directory, run this command to start the node.js server

```
node index.js
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
      default: 'user',
    },
    memberShip: {
      type: String,
      required: true,
      default: 'member',
    },
    language: {
      type: String,
      required: true,
      default: 'en',
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
    creditCard: {
      cardNum: {
        type: String,
        trim: true,
      },
      cardName: {
        type: String,
        trim: true,
      },
    },
    cart: {
      type: Schema.Types.ObjectId,
    },
    orderHistory: {
      type: Schema.Types.ObjectId,
    },
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
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    default: '/random_path',
  },
  feature: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  price: {
    type: String,
  },
  discount: {
    type: String,
  },
  stock: {
    type: Number,
  },
  size: {
    small: {
      type: String,
      stock: {
        type: Number,
      },
    },
    medium: {
      type: String,
      stock: {
        type: Number,
      },
    },
    large: {
      type: String,
      stock: {
        type: Number,
      },
    },
    extra_large: {
      type: String,
      stock: {
        type: Number,
      },
    },
  },
})
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
