// interface User {
//     name: string;
//     points: number;
//     department: string; // Added department field
// }

// export const generateDummyLeaderboardData = (numUsers: number): User[] => {
//     const names = [
//         'Alice', 'Bob', 'Charlie', 'David', 'Eve', 
//         'Frank', 'Grace', 'Hannah', 'Isaac', 'Jack',
//         'Katherine', 'Liam', 'Mia', 'Noah', 'Olivia',
//         'Pablo', 'Quinn', 'Rita', 'Sam', 'Tina',
//     ];

//     // Define possible departments
//     const departments = ['MCA', 'Computer Science', 'Civil', 'Mechanical', 'Electrical'];

//     // Generate unique users
//     const users = new Set<User>();

//     while (users.size < numUsers) {
//         const randomName = names[Math.floor(Math.random() * names.length)];
//         const randomPoints = Math.floor(Math.random() * 1000); // Random points between 0 and 999
//         const randomDepartment = departments[Math.floor(Math.random() * departments.length)]; // Random department

//         users.add({ name: randomName, points: randomPoints, department: randomDepartment });
//     }

//     return Array.from(users);
// };
