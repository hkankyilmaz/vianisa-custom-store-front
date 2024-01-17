import {BlogContent, BlogSchema} from '~/components/Blogs';

export default function Blog() {
  const content = [
    {
      type: 'text',
      content: [
        'Ensuring that your ring fits perfectly is essential for both comfort and security. A well-fitted ring should slide smoothly onto your finger without being too loose or too tight. To accurately measure your ring size, you have a couple of options available to you.',
        'Option 1: Request a Free Ring Sizer',
        'You can request a free ring sizer from Vianisa, which will be delivered to your address at no additional cost. This is the most precise way to determine your ring size.',
        'Option 2: Use a String of Paper, Pen & Ruler',
        'If you need a quick approximate measurement, you can follow these steps using a strip of paper, a pen, and a ruler:',
      ],
    },
    {
      type: 'list',
      content: [
        'Take a strip of paper that is no wider than 1.4 cm (½ inch).',
        'Wrap the paper around the base of the finger on which you intend to wear the ring.',
        'Mark the point where the paper forms a complete circle and overlaps.',
        'Measure the distance between the two marks on the paper using a ruler (in millimeters).',
        'Refer to the ring size chart below and choose the closest measurement.',
      ],
    },
    {
      type: 'text',
      content: ['Tips for a More Approximate Measurement at Home:'],
    },
    {
      type: 'list',
      content: [
        "Keep in mind that the size of your finger can change with temperature. It tends to expand in warm weather and shrink in cold weather. Therefore, it's best to measure your finger when it's warm and at the end of the day when it's largest for a more accurate reading.",
        "It's recommended to measure your ring size multiple times before making a purchase.",
        'Remember that your left hand and right hand are generally the same size, so measure the finger on which you plan to wear the ring.',
      ],
    },
    {
      type: 'space',
    },
    {
      type: 'title',
      content: 'HOW TO DETERMINE HER RING SIZE WITHOUT HER KNOWING',
    },
    {
      type: 'text',
      content: [
        "If you're planning a surprise proposal and want to find out her ring size without her knowing, here are some helpful tips:",
      ],
    },
    {
      type: 'list',
      content: [
        'Seek Assistance from Her Closest Friends and Family: Ask her loved ones to casually inquire about her ring size without giving away the surprise.',
        "Borrow from Her Jewelry Collection: If you're certain she won't notice, borrow one of her rings and measure the inside diameter using the method described above. Instead of wrapping the paper around a finger, wrap it inside the borrowed ring.",
        "Consider Standard Ring Sizes: If you're unable to determine her exact size, you can rely on the standard ring sizes as a guide. For women, the available ring sizes typically range from 3 to 9, with the most common sizes falling between 5 and 7. Size 6 is the most frequently purchased. For men, ring sizes typically range from 6 to 13, with popular sizes falling between 8 and 10½. Size 9 is the most commonly purchased.",
      ],
    },
    {
      type: 'space',
    },
    {
      type: 'title',
      content: 'WHAT IF I ORDER THE WRONG SIZE?',
    },
    {
      type: 'text',
      content: [
        "If you order the wrong size, there's no need to stress. At Vianisa, we offer a resizing service for our wedding and engagement rings during the first year. Additionally, we are committed to 100% customer satisfaction, so you have the option to return your ring within the first 30 days of its arrival with a 100% money-back guarantee.",
      ],
    },
    {
      type: 'space',
    },
    {
      type: 'title',
      content: 'DO RINGS CHANGE WHEN THEY ARE RESIZED?',
    },
    {
      type: 'text',
      content: [
        'During the resizing process, our skilled jewelry craftsmen may need to add or remove small amounts of metal from your ring to ensure the best possible fit. As a result, your ring may become slightly thicker or thinner, but these changes are not visible to the naked eye, nor can you feel them when wearing the ring. Rest assured that our experienced artisans adhere to the highest quality standards at Vianisa, ensuring that your resized ring will continue to sparkle and fit perfectly. After resizing, your ring will also be cleaned and polished before being shipped back to you. So, you can trust us to provide you with the best quality and service when it comes to resizing your jewelry.',
      ],
      className: '!mb-0',
    },
  ];

  return (
    <>
      <BlogSchema title={'how to measure your ring size'}>
        <BlogContent content={content} />
      </BlogSchema>
    </>
  );
}
