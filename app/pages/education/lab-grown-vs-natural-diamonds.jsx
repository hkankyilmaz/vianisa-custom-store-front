import {BlogContent, BlogSchema} from '~/components/Blogs';

export default function Blog() {
  const content = [
    {
      type: 'title',
      content: 'LAB-GROWN DIAMONDS VS. NATURAL DIAMONDS: A COMPARISON',
    },
    {
      type: 'text',
      content: [
        "Lab-grown diamonds and natural diamonds may share many similarities, but there are a few key differences between them. Lab-grown diamonds are created in a controlled laboratory environment using advanced technology, while natural diamonds are formed naturally within the Earth. Here's a breakdown of the main points of distinction:",
      ],
    },
    {
      type: 'list',
      content: [
        {
          type: 'combinedText',
          content: [
            'Origin: ',
            'Lab-grown diamonds are created in a controlled laboratory environment, while natural diamonds are formed naturally within the Earth.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: [
            'Composition: ',
            'Both lab-grown and natural diamonds are made of pure carbon and possess the same crystal structure.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: [
            '4Cs: ',
            'Lab-grown diamonds are graded and certified based on the same 4Cs—cut, clarity, color, and carat—as natural diamonds. They exhibit similar chemical, optical, and physical qualities.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: [
            'Simulants: ',
            'Lab-grown diamonds should not be confused with diamond simulants, such as glass or cubic zirconia. Simulants resemble diamonds but lack the same properties and durability.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
      ],
    },
    {
      type: 'title',
      content: 'PROS AND CONS OF LAB-GROWN DIAMONDS:',
    },
    {
      type: 'title',
      content: 'Pros:',
      tag: 'h3',
    },
    {
      type: 'list',
      content: [
        {
          type: 'combinedText',
          content: [
            'Visual Similarity: ',
            'Lab-grown diamonds closely resemble natural diamonds to the naked eye, making them indistinguishable without specialized instruments.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: [
            'Consistency: ',
            'Due to advanced lab technology, lab-grown diamonds exhibit consistent characteristics, such as VS clarity and a very good cut grade, which can result in more affordable pricing.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: [
            'Color Options: ',
            'Lab-grown diamonds offer a wider range of color options, including rare and expensive colors that may be hard to find naturally.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: [
            'Durability: ',
            'Lab-grown diamonds are as durable as natural diamonds, maintaining their radiance and longevity over time.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: [
            'Ethical Aspect: ',
            'Lab-grown diamonds are ethically produced, avoiding issues of exploitation or corruption associated with some mined diamonds.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
      ],
    },
    {
      type: 'title',
      content: 'Cons:',
      tag: 'h3',
    },
    {
      type: 'list',
      content: [
        {
          type: 'combinedText',
          content: [
            'Imperfections: ',
            'Lab-grown diamonds may still have minor internal or surface inclusions, similar to natural diamonds in the VS clarity range. However, these inclusions are typically not visible to the naked eye.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: [
            'Lack of Rarity: ',
            'Lab-grown diamonds lack the unique rarity found in natural diamonds, as they are consistently produced with the same properties.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
      ],
    },
    {
      type: 'text',
      content: [
        'At Vianisa, we offer both natural and lab-grown diamonds, depending on your preferences and the design of the piece. We can also customize your choice of stone and metal, so feel free to contact us for further assistance.',
      ],
      className: '!mb-0',
    },
  ];

  return (
    <>
      <BlogSchema title={'lab-grown vs. natural diamonds'}>
        <BlogContent content={content} />
      </BlogSchema>
    </>
  );
}
