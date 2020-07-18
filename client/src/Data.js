// import base url
import config from "./config";
// methods for fetching data from the REST API
export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }
  // get user from the API
  async getUser(username, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      username,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }
  // create user from the API
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  // get courses from the API
  async getCourses() {
    const response = await this.api("/courses");
    if (response.status === 200) {
      return response.json().then((data) => {
        return data;
      });
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  // get course from teh API
  async getCourse(id) {
    const response = await this.api("/courses/" + id);
    if (response.status === 200) {
      return response.json().then((data) => {
        return data;
      });
    } else if (response.status === 404) {
      return response.json().then((data) => {
        return data;
      });
    } else {
      throw new Error();
    }
  }
  // delete course from the API
  async deleteCourse(username, password, id) {
    const response = await this.api(`/courses/${id}`, "DELETE", null, true, {
      username,
      password,
    });
    if (response.status === 204) {
      return response;
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  // create course from the API
  async createCourse(username, password, course) {
    const response = await this.api("/courses/", "POST", course, true, {
      username,
      password,
    });
    // possible responses 201, 400, 401, 500
    if (response.status === 201) {
      return response;
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data;
      });
    } else {
      throw new Error();
    }
  }
  // update course from the API
  async updateCourse(username, password, course) {
    const response = await this.api(
      `/courses/${course.id}`,
      "PUT",
      course,
      true,
      { username, password }
    );
    if (response.status === 204) {
      return response;
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data;
      });
    } else {
      throw new Error();
    }
  }
}
