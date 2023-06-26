export interface Post {
    id?: number; //Id of the post, set to optional because New posts wont have an ID until after they are entered into the database.
    title: string; //Title of the post.
    summary: string; //Summary of the post content.
    content: string; //Main post content.
    author: string; //Author of the post.
    category: string; //Category of post.
    created_on?: string; //Timestamp of creation date.
    created_by?: number; //User id of the creator of the post.
  }
  
  export interface Category {
    id?: number; //Id of the category, set to optional because New categories wont have an ID until after they are entered into the database.
    name: string; //Name of the category.
    created_on?: string; //Timestamp of creation date.
    created_by?: number; //User id of the creator of the post.
  }
  
  export interface User {
    id?: number //Id of the user, set to optional because New users wont have an ID until after they are entered into the database.
    first_name: string; //First name of the user.
    last_name: string; //Last name of th euser.
    email: string; //Email of the user.
    password?: string; //Password hash of the user.
    salt?: string; //Hash salt for the users password.
    group: number; //Users group id.
    active: number; //Whether or not the user is in an active state.
    created_on?: string; //Timestamp of creation date.
    created_by?: number; //User id of the creator of the post.
  }
  
  export interface UserGroup {
    id?: number; //Id of the user group, set to optional because New user groups wont have an ID until after they are entered into the database.
    name: string; //Name of the users group.
    created_on?: string; //Timestamp of creation date.
    created_by?: number; //User id of the creator of the post.
  }

  export interface AuthToken {
    id?: number; //Id of the authentication token, set to optional because New auth tokens wont have an ID until after they are entered into the database.
    users_id: number; //Id of the user that the authentication token is bound to.
    token: string; //Authentication token
    expiration: number; //Expiration timestamp.
  }