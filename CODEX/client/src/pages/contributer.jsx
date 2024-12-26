import React from 'react';
import { Globe } from 'lucide-react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { motion } from 'framer-motion';
import sumit_pic from '../assets/SUMIT_SAGAR.jpg';

const Avatar = ({ src, alt, fallback }) => (
    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-gray-800 bg-gray-900">
        {src ? (
            <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
            <span className="text-white">{fallback}</span>
        )}
    </div>
);

const Card = ({ children }) => (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:translate-y-2">
        {children}
    </div>
);

const CardContent = ({ children }) => (
    <div className="p-5 text-center">
        {children}
    </div>
);

const contributors = [
    {
        name: 'Sumit Sagar',
        role: 'Lead Developer',
        avatar: '../assets/SUMIT_SAGAR.jpg',
        github: 'https://github.com/Sumit45Sagar',
        linkedin: 'https://www.linkedin.com/in/sumit-sagar-3813b5216/',
        website: 'https://sumitsagarportfolio.netlify.app/',
        expertise: ['React', 'Node.js', 'API', 'Web Socket'],
    },
    {
        name: 'Vivek Nehra',
        role: 'Frontend Specialist',
        avatar: '/vivek.jpg',
        github: 'https://github.com/Vivek7411',
        linkedin: 'https://linkedin.com/in/viveknehra',
        website: 'https://viveknehra.com',
        expertise: ['AWS', 'React', 'CSS', 'UI/UX Design'],
    },
    {
        name: 'Vikhyat Garg',
        role: 'Backend Engineer',
        avatar: '/vikhyat.jpg',
        github: 'https://github.com/vikhyat9690',
        linkedin: 'https://linkedin.com/in/vikhyat-garg',
        website: 'https://vikhyatgarg.io',
        expertise: ['MongoDB', 'Node.js', 'Express', 'Authentication'],
    },
];

const ContributorCard = ({ name, role, avatar, github, linkedin, website, expertise }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
    >
        <Card>
            <div className="bg-gradient-to-r from-green-500 to-green-600 h-16"></div>
            <CardContent>
                <div className="avatar-wrapper">
                    <Avatar
                        src={avatar}
                        alt={name}
                        fallback={name.split(' ').map((n) => n[0]).join('')}
                    />
                </div>
                <h3 className="text-xl font-bold mt-2">{name}</h3>
                <p className="text-sm text-gray-400 mb-4">{role}</p>
                <div className="expertise-tags">
                    {expertise.map((tag, index) => (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs m-1 inline-block" key={index}>{tag}</span>
                    ))}
                </div>
                <div className="social-icons flex justify-center mt-4">
                    <a href={github} target="_blank" rel="noopener noreferrer" className="mx-2 text-gray-400 text-xl hover:text-green-500">
                        <SiGithub />
                    </a>
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="mx-2 text-gray-400 text-xl hover:text-green-500">
                        <SiLinkedin />
                    </a>
                    <a href={website} target="_blank" rel="noopener noreferrer" className="mx-2 text-gray-400 text-xl hover:text-green-500">
                        <Globe />
                    </a>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

export default function ContributorsPage() {
    return (
        <div className="bg-black text-white min-h-screen">
            <div className="container mx-auto p-5">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl mb-2">Our Amazing Contributors</h1>
                    <p className="text-lg text-gray-400">The talented individuals behind Codex</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center"
                >
                    {contributors.map((contributor, index) => (
                        <ContributorCard {...contributor} key={index} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
