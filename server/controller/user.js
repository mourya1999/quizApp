import bcrypt from 'bcryptjs'
import db from '../db/db.js'

// Helper function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Helper function to compare passwords
const comparePassword = async (enteredPassword, storedPassword) => {
  return await bcrypt.compare(enteredPassword, storedPassword);
};

// Function to register a new user
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, mobile, dateOfBirth, pincode, password, referralCode } = req.body;

  if (!firstName || !lastName || !email || !mobile || !dateOfBirth || !pincode || !password) {
    return res.status(400).json({ message: 'All fields are required apart from referral code' });
  }

  try {
    // Check if email already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Calculate reward points
      let rewardPoints = 200; // Default for first-time users

      if (referralCode) {
        // Check if the referral code is valid
        db.query('SELECT * FROM users WHERE referralCode = ?', [referralCode], (err, referralResult) => {
          if (err) throw err;

          if (referralResult.length > 0) {
            rewardPoints = 100; // Both users get 100 reward points
            db.query('UPDATE users SET rewardPoints = rewardPoints + 100 WHERE referralCode = ?', [referralCode], (err, updateReferralUser) => {
              if (err) throw err;
              console.log('Referral user points updated');
            });
          }
        });
      }

      // Generate a unique referral code for the new user
      const newReferralCode = Math.random().toString(36).substring(2, 8);

      // Insert user into the database
      db.query(
        'INSERT INTO users (firstName, lastName, email, mobile, dateOfBirth, pincode, password, referralCode, rewardPoints) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [firstName, lastName, email, mobile, dateOfBirth, pincode, hashedPassword, newReferralCode, rewardPoints],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error registering user' });
          }
          return res.status(201).json({
            message: 'User registered successfully',
            referralCode: newReferralCode, // Return the referral code for the user
            rewardPoints,
          });
        }
      );
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Function to login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if the user exists in the database
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database query error' });
      }

      if (result.length === 0) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // User found, compare the entered password with the hashed password in the database
      const user = result[0];  // The first result in the array is the user

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // If password is valid, return user data (e.g., user id, email, and reward points)
      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          rewardPoints: user.rewardPoints,
          referralCode: user.referralCode,  // You can include referral code if needed
        },
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
