// import { NextRequest, NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/mongodb'; // Adjust this to your actual database connection utility
// import { ObjectId } from 'mongodb';

// interface Experience {
//   id: number;
//   company: string;
//   role: string;
//   duration: string;
//   description: string;
// }

// interface ProfileData {
//   username: string;
//   email: string;
//   registerNumber: string;
//   degree: string;
//   batch: number;
//   college: string;
//   level: number;
//   experiences: Experience[];
// }

// // Fetch user profile
// export async function GET(req: NextRequest) {
//   try {
//     const url = new URL(req.url);
//     const userId = url.searchParams.get('userId');
//     console.log("ProfileBackEnd:"+userId);


//     if (!userId) {
//       return NextResponse.json({ message: 'userId query parameter is required' }, { status: 400 });
//     }

//     // // Convert string userId to ObjectId for the query
//     // let objectIdUserId;
//     // try {
//     //   objectIdUserId = new ObjectId(userId);  // Converts string to ObjectId
//     // } catch (err) {
//     //   return NextResponse.json({ message: 'Invalid userId format' }, { status: 400 });
//     // }

//     // console.log(ObjectId.isValid(objectIdUserId));


//     const { db } = await connectToDatabase();

//     // Validate and convert userId to ObjectId
//     // if (!ObjectId.isValid(userId)) {
//     //   return NextResponse.json({ message: 'Invalid userId format' }, { status: 400 });
//     // }
//     // const objectIdUserId = new ObjectId(userId);

//     // Query the database using ObjectId
//     const userProfile = await db.collection('users').findOne({ _id: new ObjectId(userId) });

//     if (!userProfile) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     const profile: ProfileData = {
//       username: userProfile.username,
//       email: userProfile.email,
//       registerNumber: userProfile.registerNumber,
//       degree: userProfile.degree,
//       batch: userProfile.batch,
//       college: userProfile.college,
//       level: userProfile.level,
//       experiences: userProfile.experiences || [],
//     };

//     return NextResponse.json(profile);
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }


// // Update user profile
// export async function PUT(req: NextRequest) {
//   try {
//     const url = new URL(req.url);
//     const userId = url.searchParams.get('userId');

//     if (!userId) {
//       return NextResponse.json({ message: 'userId query parameter is required' }, { status: 400 });
//     }
//     let loggedInUserId = sessionStorage.getItem('profileUserId');
//      // Check if the logged-in user is the same as the userId in the query
//      if (loggedInUserId !== userId) {
//       return NextResponse.json({ message: 'You can only update your own profile' }, { status: 403 });
//     }

//     const { db } = await connectToDatabase();
//     const { experiences } = await req.json();

//     if (!experiences || !Array.isArray(experiences)) {
//       return NextResponse.json({ message: 'Invalid experiences data' }, { status: 400 });
//     }

//     const result = await db.collection('users').updateOne(
//       { _id: new ObjectId(userId) },
//       { $set: { experiences } }
//     );

//     if (result.matchedCount === 0) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     return NextResponse.json({ message: 'Profile updated successfully' });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; // Adjust this to your actual database connection utility
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface ProfileData {
  username: string;
  email: string;
  registerNumber: string;
  degree: string;
  batch: number;
  college: string;
  level: number;
  experiences: Experience[];
}

// Fetch user profile
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ message: 'userId query parameter is required' }, { status: 400 });
    }

    // Validate and convert userId to ObjectId
    let objectIdUserId;
    try {
      objectIdUserId = new ObjectId(userId);  // Converts string to ObjectId
    } catch (err) {
      return NextResponse.json({ message: 'Invalid userId format' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    // Query the database using ObjectId
    const userProfile = await db.collection('users').findOne({ _id: objectIdUserId });

    if (!userProfile) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const profile: ProfileData = {
      username: userProfile.username,
      email: userProfile.email,
      registerNumber: userProfile.registerNumber,
      degree: userProfile.degree,
      batch: userProfile.batch,
      college: userProfile.college,
      level: userProfile.level,
      experiences: userProfile.experiences || [],
    };

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// Update user profile

const secretKey = process.env.TOKEN_SECRET_KEY

export async function PUT(req: NextRequest) {
  try {
    const jwtToken = req.cookies.get('token');
    console.log("jwtToken: ", jwtToken?.value);

    if (!jwtToken || !jwtToken.value) {
      return NextResponse.json({ message: 'Unauthorized, no token provided' }, { status: 401 });
    }

    // Ensure the secret key is defined
    if (!secretKey) {
      return NextResponse.json({ message: 'Internal Server Error: Secret key not defined' }, { status: 500 });
    }

    // Decode the JWT token
    const decoded = jwt.verify(jwtToken.value, secretKey);
    console.log(decoded);
    

    // Cast the decoded token to get the userId
    const userId = (decoded as jwt.JwtPayload).id;
     console.log("DecodedUId: "+userId);
     
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized, userId not found in token' }, { status: 401 });
    }

    // console.log("CookiesUserId: ", userId);

    // Extract the userId from the request
    const url = new URL(req.url);
    const requestedUserId = url.searchParams.get('userId');


    // 672f8067c02851085ab8f36c
    if (!requestedUserId || requestedUserId !== userId) {
      return NextResponse.json({ message: 'You are not authorized to update this profile' }, { status: 403 });
    }

    // Now that we have the userId, we can proceed with the logic to update the profile
    const { username, email, registerNumber, degree, batch, college, level, experiences } = await req.json();

    if (!experiences || !Array.isArray(experiences)) {
      return NextResponse.json({ message: 'Invalid experiences data' }, { status: 400 });
    }

    const updatePayload = {
      username,
      email,
      registerNumber,
      degree,
      batch,
      college,
      level,
      experiences,
    };

    // Connect to the database and update the user profile
    const { db } = await connectToDatabase();

    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: updatePayload }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

