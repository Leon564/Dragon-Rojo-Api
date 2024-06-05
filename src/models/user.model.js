const _user = {
    "username": null,
    "email": null,
    "password": null,
    "role": "user"
}

const user = (username, email, password, role) => {
    _user.username = username;
    _user.email = email;
    _user.password = password;
    _user.role = role;

    return _user;
}

export default user;