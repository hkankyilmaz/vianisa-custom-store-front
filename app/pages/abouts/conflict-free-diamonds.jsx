import Title from '../../components/Blogs/Title';
import Schema1 from '../../components/Blogs/Schema1';

export const meta = ({data}) => {
  return [{title: 'Conflict Free Diamonds'}];
};

export default function Product() {
  let texts = [
    {
      title: 'ORIGIN OF DIAMONDS',
      body: "Diamonds, known for their exceptional rarity and beauty, have a remarkable journey that spans hundreds of millions of years. Formed deep within the Earth, approximately 100 miles (161 km) beneath the surface, diamonds endure extreme temperatures of 2100℉ (1150℃) and pressures 45,000 times greater than at sea level. These conditions were made possible by ancient volcanic activity. Today, diamonds are primarily sourced from vertical rock formations called 'kimberlite pipes,' which were formed through intense volcanic eruptions. The largest kimberlite pipes are found in South Africa, Australia, Siberia, and Northwest Canada.",
    },
    {
      title: "ORIGIN OF ETERNATE'S DIAMONDS",
      body: 'At Eternate, we have curated a collection of diamonds sourced from reputable suppliers who adhere to strict ethical guidelines, including documentation in accordance with the Kimberley Process. Our diamonds predominantly come from mines in Australia, Africa, and Canada.',
    },
    {
      title: 'UNDERSTANDING THE KIMBERLEY PROCESS',
      body: 'Eternate operates in full compliance with the Kimberley Process, an international agreement among governments aimed at eliminating the trade of conflict diamonds. Established in 2003, the Kimberley Process unites 83 governments and implements stringent guidelines for the inspection and tracking of diamond exports and imports. By engaging exclusively with certified diamonds, Eternate promotes transparency within the diamond industry.',
    },
    {
      title: 'THE IMPORTANCE OF THE KIMBERLEY PROCESS',
      body: 'The Kimberley Process plays a crucial role in ensuring transparency and accountability in the fine diamond and jewelry industry. Its purpose is to guarantee that diamonds are obtained ethically and are free from exploitation and corruption. By participating in the Kimberley Process, we not only fulfill our responsibility but also collaborate with like-minded individuals and organizations. Ultimately, these collective efforts enable our customers to trace and authenticate their diamonds, providing confidence from the origin of the diamond to its final delivery.',
    },
    {
      title: 'THE EMERGENCE OF THE KIMBERLEY PROCESS',
      body: 'The concept of conflict diamonds gained global attention during the devastating conflict in Sierra Leone in the late 1990s. Conflict diamonds are defined by the United Nations as diamonds mined in areas controlled by illegitimate forces opposing legitimate and internationally recognized governments. The issue lies with rebel groups that exploit diamonds and other natural resources to fund their illicit activities, rather than with diamonds themselves. Through the Kimberley Process Certification Scheme and the dedicated efforts of its participants, the trade in conflict diamonds has been significantly reduced and monitored, ensuring a more responsible diamond industry.',
    },
  ];
  let newkomp = texts.map((text) => {
    return (
      <>
        <h4 className="font-title mb-[20.8px] text-[13px] font-semibold text-[#2f2f2f]">
          {text.title}
        </h4>
        <p className="font-body mb-[40px] text-[13px] text-[#2f2f2f]">
          {text.body}
        </p>
        <br />
      </>
    );
  });
  return (
    <>
      <Schema1 children={newkomp} title={'Conflict Free Diamonds'} />
    </>
  );
}
