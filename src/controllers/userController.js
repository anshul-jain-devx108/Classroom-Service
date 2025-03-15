const { db } = require("../config/firebaseAdmin");
const User = require("../models/UserModel");
const admin = require("firebase-admin");

/**
 * Create a new user
 */
exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, location, subject, education } = req.body;

    // Replace special characters in email
    const userId = email.replace(/[@.]/g, "_"); 

    await db.collection("users").doc(userId).set({
      name,
      email, // Store original email in the document
      phone,
      location,
      subject,
      education,
      classrooms: [],
    });

    res.status(201).json({ id: userId, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * Get a single user by ID
 */
exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "User ID is required" });

    console.log("Fetching User with ID:", id); // Debugging log

    const userDoc = await db.collection("users").doc(id).get();

    if (!userDoc.exists) {
      console.log("User not found in Firestore:", id);
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ id, ...userDoc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/**
 * Update a user
 */
exports.updateUser = async (req, res) => {
  try {
    const { email, updates } = req.body;

    if (!email || !updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "Email and updates are required" });
    }

    // Convert email to Firestore-safe ID
    const userId = email.replace(/[@.]/g, "_");

    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user fields
    await userRef.update(updates);

    // Fetch updated user data
    const updatedUser = await userRef.get();

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser.data(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/**
 * Delete a user
 */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("users").doc(id).delete();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
