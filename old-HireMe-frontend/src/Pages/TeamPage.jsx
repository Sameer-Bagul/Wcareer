import React from "react";
import LandingNavbar from "../components/LandingNavbar";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Bonnie Green",
      position: "CEO & Web Developer",
      description:
        "Bonnie drives the technical strategy of the Flowbite platform and brand.",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
      links: [
        { href: "#", icon: "facebook", title: "Facebook" },
        { href: "#", icon: "twitter", title: "Twitter" },
        { href: "#", icon: "github", title: "GitHub" },
        { href: "#", icon: "dribbble", title: "Dribbble" },
      ],
    },
    {
      name: "Bonnie Green",
      position: "CEO & Web Developer",
      description:
        "Bonnie drives the technical strategy of the Flowbite platform and brand.",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
      links: [
        { href: "#", icon: "facebook", title: "Facebook" },
        { href: "#", icon: "twitter", title: "Twitter" },
        { href: "#", icon: "github", title: "GitHub" },
        { href: "#", icon: "dribbble", title: "Dribbble" },
      ],
    },
    {
      name: "Bonnie Green",
      position: "CEO & Web Developer",
      description:
        "Bonnie drives the technical strategy of the Flowbite platform and brand.",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
      links: [
        { href: "#", icon: "facebook", title: "Facebook" },
        { href: "#", icon: "twitter", title: "Twitter" },
        { href: "#", icon: "github", title: "GitHub" },
        { href: "#", icon: "dribbble", title: "Dribbble" },
      ],
    },
    {
      name: "Bonnie Green",
      position: "CEO & Web Developer",
      description:
        "Bonnie drives the technical strategy of the Flowbite platform and brand.",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
      links: [
        { href: "#", icon: "facebook", title: "Facebook" },
        { href: "#", icon: "twitter", title: "Twitter" },
        { href: "#", icon: "github", title: "GitHub" },
        { href: "#", icon: "dribbble", title: "Dribbble" },
      ],
    },
    {
      name: "Bonnie Green",
      position: "CEO & Web Developer",
      description:
        "Bonnie drives the technical strategy of the Flowbite platform and brand.",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
      links: [
        { href: "#", icon: "facebook", title: "Facebook" },
        { href: "#", icon: "twitter", title: "Twitter" },
        { href: "#", icon: "github", title: "GitHub" },
        { href: "#", icon: "dribbble", title: "Dribbble" },
      ],
    },
    {
      name: "Jese Leos",
      position: "CTO",
      description:
        "Jese drives the technical strategy of the Flowbite platform and brand.",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png",
      links: [
        { href: "#", icon: "facebook", title: "Facebook" },
        { href: "#", icon: "twitter", title: "Twitter" },
        { href: "#", icon: "github", title: "GitHub" },
        { href: "#", icon: "dribbble", title: "Dribbble" },
      ],
    },
  ];

  return (
    <>
      <LandingNavbar />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Team
            </h2>
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
              Explore the whole collection of open-source web components and
              elements built with the utility classes from Tailwind.
            </p>
          </div>
          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <img
                    className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                    src={member.image}
                    alt={`${member.name} Avatar`}
                  />
                </a>
                <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">{member.name}</a>
                  </h3>
                  <span className="text-gray-500 dark:text-gray-400">
                    {member.position}
                  </span>
                  <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                    {member.description}
                  </p>
                  <ul className="flex space-x-4 sm:mt-0">
                    {member.links.map((link, idx) => (
                      <li key={idx}>
                        <a
                          href={link.href}
                          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                          title={link.title}
                        >
                          <i className={`fab fa-${link.icon} w-5 h-5`} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamSection;
