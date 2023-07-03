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
            review: 'Working with Luke was an absolute pleasure! Their team developed a responsive website that exceeded our expectations. They paid great attention to detail, ensuring our site looked fantastic on all devices.',
            services: ['Custom Development'],
        },
        {
            id: 3,
            name: 'Jack Herringe',
            business: 'CarCup',
            review: 'Their expertise in e-commerce development helped us create a seamless online shopping experience for our customers. We highly recommend Luke.',
            services: ['E-commerce', 'SEO'],
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

    return { reviews, services };
};
