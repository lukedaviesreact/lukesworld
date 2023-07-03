export const useServicesData = () => {
    const reviews = [
        {
            id: 1,
            name: 'Daniel Wright',
            business: 'Digital Tokenization',
            review: 'We approached Luke for a custom web application, and we were blown away by the outcome. He understood our business requirements perfectly and delivered a highly functional and user-friendly application.',
            services: ['Responsive Web Design'],
        },
        {
            id: 2,
            name: 'Zac Duggan',
            business: 'Peddle Perth',
            review: 'Working with Luke was an absolute pleasure! He developed a responsive website that exceeded our expectations. He paid great attention to detail, ensuring our site looked fantastic on all devices.',
            services: ['Custom Development'],
        },
        {
            id: 3,
            name: 'Jack Herringe',
            business: 'CarCup',
            review: 'His expertise in e-commerce development helped us create a seamless online shopping experience for our customers. We highly recommend Luke.',
            services: ['E-commerce', 'SEO'],
        },
    ];

    const highlightedServices = [
        {
            service: 'Custom Web Development',
            description:
                "With a keen eye for detail and a commitment to excellence, I specialize in crafting tailor-made websites that capture your brand's essence and captivate your audience. By leveraging the latest technologies and industry best practices, I ensure your website is not only visually stunning but also highly functional, responsive, and user-friendly.",
            emoji: '🚀',
        },
        {
            service: 'E-commerce Solutions',
            description:
                "Looking to expand your online presence and boost your sales? I can develop robust e-commerce platforms that seamlessly integrate with your existing systems or start from scratch, providing you with a secure and scalable solution. From shopping carts and payment gateways to inventory management and order tracking, I've got you covered.",
            emoji: '🛠️',
        },
        {
            service: 'Mobile Application Development',
            description:
                "In today's mobile-first world, having a mobile app is essential to stay ahead of the competition. With expertise in both iOS and Android app development, I create user-friendly and feature-rich mobile applications that deliver an immersive experience. Whether it's a productivity tool, a customer engagement platform, or a game-changing app, I have the skills to bring your vision to life.",
            emoji: '🚀',
        },
        {
            service: 'API Integration',
            description:
                'Streamline your business operations by integrating third-party APIs into your existing software systems. I possess extensive experience in API integration, allowing you to seamlessly connect your applications with popular services, such as payment gateways, social media platforms, and cloud storage providers. Unlock the power of integration and enhance your workflow efficiency.',
            emoji: '🚀',
        },
        {
            service: 'Website Maintenance and Support',
            description:
                'Your digital presence requires regular upkeep to ensure optimal performance and security. I offer comprehensive website maintenance and support services, including security updates, bug fixes, content updates, and performance optimization. Let me handle the technical aspects, so you can focus on your core business activities.',
            emoji: '🚀',
        },
    ];

    const services = [
        {
            title: 'Responsive Web Design',
            content:
                'Creating websites that provide an optimal viewing experience across various devices, including desktops, tablets, and mobile phones.',
        },
        {
            title: 'E-commerce Development',
            content:
                'Building secure and user-friendly online stores with features such as product catalogs, shopping carts, payment gateways, and inventory management.',
        },
        {
            title: 'Custom Web Application Development',
            content:
                'Designing and developing tailor-made web applications to automate business processes, improve efficiency, and enhance user experiences.',
        },
        {
            title: 'Mobile App Development',
            content:
                'Creating mobile applications for iOS and Android platforms to extend the reach of businesses and engage with customers on the go.',
        },
        {
            title: 'UI/UX Design',
            content:
                'Enhancing user experiences through intuitive and visually appealing website designs, focusing on usability, accessibility, and seamless navigation.',
        },
        {
            title: 'API Development and Integration',
            content:
                'Building and integrating APIs (Application Programming Interfaces) to enable data exchange and seamless integration between different software systems.',
        },
        {
            title: 'Search Engine Optimization (SEO)',
            content:
                'Optimizing websites to improve their visibility in search engine results, driving organic traffic and increasing online presence.',
        },
        {
            title: 'Performance Optimization',
            content:
                'Improving website speed, performance, and scalability to enhance user experiences and reduce bounce rates.',
        },
        {
            title: 'Security and Data Protection',
            content:
                'Implementing robust security measures to protect websites and user data, including SSL certificates, firewalls, encryption, and adherence to privacy regulations.',
        },
    ];

    return { reviews, services, highlightedServices };
};
