import React from "react";
import g1 from "../../assets/donation/g1.jpg";
import g2 from "../../assets/donation/g2.jpg";
import g3 from "../../assets/donation/g3.jpg";
import g4 from "../../assets/donation/g4.jpg";

const AboutDonation = () => {
  const data = [
    {
      title: "Registration",
      img: g1,
      description:
        "Sign up to become an organ donor by registering through an official healthcare center or online portal. This step records your intent and eligibility for donation. It's important to inform your family about your decision, as they will be involved in the donation process. The registration can be done at the DMV, health organizations, or through various online platforms",
    },
    {
      title: "Medical Evaluation",
      img: g2,
      description:
        "A thorough medical evaluation ensures the donor is eligible, focusing on medical history, blood tests, and organ health to ensure the safety and suitability of the organs. This evaluation helps to identify any potential health risks and confirms that the organs can be safely transplanted. Medical professionals take great care to respect the donor's dignity and privacy during this process.",
    },
    {
      title: "Donation Process",
      img: g3,
      description:
        "After a donor's passing, the retrieval process is carried out with care by a surgical team to ensure viable organ transplants for recipients in need. This process involves advanced medical techniques and technologies to preserve the integrity of the organs. The timing of the retrieval is critical, as it must occur shortly after death to maximize the chances of a successful transplant.",
    },
    {
      title: "Saving Lives",
      img: g4,
      description:
        "One donor can save or significantly improve the lives of multiple individuals, giving hope and a second chance to those waiting for a transplant. The impact of organ donation extends beyond the recipients; it also brings comfort and healing to families and communities affected by illness. Awareness campaigns and personal stories highlight the importance of donation, encouraging more people to become donors.",
    },
  ];

  return (
    <section className="grid place-items-center dark:text-white-900">
      <div className="container">
        <div className="text-center">
          <br />
          <h2 className="text-3xl font-bold">Donation Process</h2>
          <br />
        </div>
        <div className="grid grid-cols-4 place-items-center">
          {data.map((e, i) => (
            <div
              className="border-metal shadow-md rounded-lg overflow-hidden max-w-[90%] select-none"
              key={i}
            >
              <img src={e.img} draggable={false} width="100%" alt={e.title} />
              <div className="m-4">
                <h1 className="font-bold text-lg text-midnight">
                  <code>{i + 1}</code> - <code>{e.title}</code>
                </h1>
                <p className="text-justify">{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutDonation;
