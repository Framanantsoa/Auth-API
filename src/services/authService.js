const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const Session = require('../models/Session');
const Auth = require('../models/Auth');
const { Op } = require('sequelize');

const SESSION_VALIDITY_MINUTES = parseInt(process.env.SESSION_VALIDITY_MINUTES) || 15;
const SESSION_ADDED_MINUTES = parseInt(process.env.SESSION_ADDED_MINUTES) || 5;


// METHODS
async function signup(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    user_first_name: data.first_name,
    user_name: data.name,
    user_email: data.email,
    user_password: hashedPassword,
    birthday: data.birthday,
    gender_id: data.gender_id
  });

  return user;
}


async function login(email, password) {
  const user = await User.findOne({ where: { user_email: email } });
  if (!user) throw new Error('Email introuvable');

  const isMatch = await bcrypt.compare(password, user.user_password);
  if (!isMatch) throw new Error('Mot de passe incorrect');

  const now = new Date();
  const expires = new Date(now.getTime() + SESSION_VALIDITY_MINUTES * 60000);

  const session = await Session.create({
    user_id: user.user_id,
    created_at: now,
    expires_at: expires
  });

  const token = uuidv4();
  await Auth.create({
    session_id: session.session_id,
    token_uuid: token
  });

  return { token, expires, user_id: user.user_id };
}


async function logout(token) {
  const auth = await Auth.findOne({ where: { token_uuid: token } });
  if (!auth) throw new Error('Session introuvable');

  // Met à jour l'expiration de la session à maintenant, sans supprimer
  await Session.update(
    { expires_at: new Date() },
    { where: { session_id: auth.session_id } }
  );

  return true;
}


async function checkSession(token) {
  const auth = await Auth.findOne({
    where: { token_uuid: token },
    include: {
      model: Session,
      required: true
    }
  });

  if (!auth || new Date(auth.Session.expires_at) < new Date()) {
    return false;
  }

  return true;
}


async function extendSession(token) {
    const auth = await Auth.findOne({
      where: { token_uuid: token },
      include: Session
    });
  
    if (!auth || !auth.Session) {
      throw new Error('Session invalide ou expirée');
    }
  
    const currentTime = new Date();
    if (currentTime > auth.Session.expires_at) {
      throw new Error('Session expirée');
    }
  
    // Ajouter SESSION_ADDED_MINUTES à expires_at
    const newExpiry = new Date(auth.Session.expires_at.getTime() + SESSION_ADDED_MINUTES * 60000);
  
    await Session.update(
      { expires_at: newExpiry },
      { where: { session_id: auth.session_id } }
    );
  
    return newExpiry;
};


module.exports = {
    signup,
    login,
    logout,
    checkSession,
    extendSession
};
