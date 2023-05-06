//This file defines the Redux store, actions, and reducers for getting, 
//creating, updating, and deleting users.

import { legacy_createStore as createStore} from 'redux'
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

const getUsersRequest = () => ({
  type: GET_USERS_REQUEST,
});

const getUsersSuccess = (users) => ({
 type: GET_USERS_SUCCESS,
 payload: users,
});

const getUsersFailure = (error) => ({
  type: GET_USERS_FAILURE,
  payload: error,
});

const createUserRequest = () => ({
  type: CREATE_USER_REQUEST,
});

const createUserSuccess = (user) => ({
  type: CREATE_USER_SUCCESS,
  payload: user,
});

const createUserFailure = (error) => ({
  type: CREATE_USER_FAILURE,
  payload: error,
});

const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST,
});

const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

const deleteUserRequest = () => ({
  type: DELETE_USER_REQUEST,
});

const deleteUserSuccess = (id) => ({
  type: DELETE_USER_SUCCESS,
  payload: id,
});

const deleteUserFailure = (error) => ({
  type: DELETE_USER_FAILURE,
  payload: error,
});

const getUsers = () => async (dispatch) => {
  dispatch(getUsersRequest());
  try {
    const response = await axios.get('https://gorest.co.in/public-api/users');
    dispatch(getUsersSuccess(response.data.data));
  } catch (error) {
    dispatch(getUsersFailure(error.message));
  }
};

const createUser = (user) => async (dispatch) => {
  dispatch(createUserRequest());
  try {
    const response = await axios.post('https://gorest.co.in/public-api/users', user);
    dispatch(createUserSuccess(response.data.data));
  } catch (error) {
    dispatch(createUserFailure(error.message));
  }
};

const updateUser = (id, user) => async (dispatch) => {
  dispatch(updateUserRequest());
  try {
    const response = await axios.put(
      `https://gorest.co.in/public-api/users/${id}`,
      user
    );
    dispatch(updateUserSuccess(response.data.data));
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
};

const deleteUser = (id) => async (dispatch) => {
  dispatch(deleteUserRequest());
  try {
    await axios.delete(`https://gorest.co.in/public-api/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
    case CREATE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        loading: false,
        error: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        loading: false,
        error: null,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        loading: false,
        error: null,
      };
    case GET_USERS_FAILURE:
    case CREATE_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore (reducer, applyMiddleware(thunk));

export { getUsers, createUser, updateUser, deleteUser, store };
