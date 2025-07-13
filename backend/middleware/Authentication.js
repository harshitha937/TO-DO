const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const secretKey = process.env.SECRET_JWT || '87gscc2zahsms' ;

const authenticateToken = (req, res, next) => {
  let token = req.header('Authorization');
  if (!token) return res.status(401).send({ message: "No token provided." });

  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  jwt.verify(token,secretKey, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).send({ message: "Token expired or invalid" });
    }
    req.user = user;
    next();
  });
};


module.exports= authenticateToken;