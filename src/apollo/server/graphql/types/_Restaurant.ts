import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  #######################TYPES#######################

  type Restaurant {
    id: ID
    name: String
    neighborhood: String
    address: String
    photo: String
    cuisine_type: String
    operating_hours: OperatingHours
    reviews: [Review]
    company: User
    latlng: LatLng
  }

  type LatLng {
    lat: Float
    lng: Float
  }

  type OperatingHours {
    Monday: String
    Tuesday: String
    Wednesday: String
    Thursday: String
    Friday: String
    Saturday: String
    Sunday: String
  }

  type Review {
    user: User
    date: String
    rating: Int
    comments: String
  }

  #######################INPUT#######################

  input InputRestaurant {
    name: String
    neighborhood: String
    address: String
    photo: String
    cuisine_type: String
    operating_hours: OperatingHoursInput
    reviews: [ReviewInput]
    company: ID
    latlng: LatLngInput
  }

  input LatLngInput {
    lat: Float
    lng: Float
  }

  input OperatingHoursInput {
    Monday: String
    Tuesday: String
    Wednesday: String
    Thursday: String
    Friday: String
    Saturday: String
    Sunday: String
  }

  input ReviewInput {
    user: ID
    date: String
    rating: Int
    comments: String
  }

  input FilterRestaurant {
    id: ID
    name: String
    neighborhood: String
    address: String
    cuisine_type: String
    operating_hours: OperatingHoursInputFilter
    reviews: [ReviewInputFilter]
    company: ID
    latlng: LatLngInputFilter
  }

  input LatLngInputFilter {
    lat: Float
    lng: Float
  }

  input OperatingHoursInputFilter {
    Monday: String
    Tuesday: String
    Wednesday: String
    Thursday: String
    Friday: String
    Saturday: String
    Sunday: String
  }

  input ReviewInputFilter {
    user: ID
    date: String
    rating: Int
    comments: String
  }

  #######################QUERY#######################
  extend type Query {
    getRestaurants(filter: FilterRestaurant): [Restaurant]
    getRestaurantById(id: ID!): Restaurant
  }
  #####################MUTACION######################
  extend type Mutation {
    newRestaurant(input: InputRestaurant): Restaurant
    updateRestaurant(id: ID!, input: InputRestaurant): Restaurant
    deleteRestaurant(id: ID!): Restaurant
  }
`;

export default typeDefs;
