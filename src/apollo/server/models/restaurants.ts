import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IRestaurants extends Document {
  company: ObjectId;
  name: string;
  neighborhood: string;
  address: string;
  photo: string;
  latlng: {
    lat: number;
    lng: number;
  };
  cuisine_type: string;
  operating_hours: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };
  reviews: {
    user: ObjectId;
    date: string;
    rating: number;
    comments: string;
  }[];
}

const RestaurantsSchema: Schema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        'https://via.placeholder.com/300/fff?text=No+Photo+Available.png',
    },
    neighborhood: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    latlng: {
      type: {
        lat: Number,
        lng: Number,
      },
      required: true,
    },
    cuisine_type: {
      type: String,
      required: true,
    },
    operating_hours: {
      Monday: {
        type: String,
        required: true,
      },
      Tuesday: {
        type: String,
        required: true,
      },
      Wednesday: {
        type: String,
        required: true,
      },
      Thursday: {
        type: String,
        required: true,
      },
      Friday: {
        type: String,
        required: true,
      },
      Saturday: {
        type: String,
        required: true,
      },
      Sunday: {
        type: String,
        required: true,
      },
    },
    reviews: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comments: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

RestaurantsSchema.set('toJSON', {
  virtuals: true,
});

export default mongoose.models.Restaurants ||
  mongoose.model<IRestaurants>('Restaurants', RestaurantsSchema);
