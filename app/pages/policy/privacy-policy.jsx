import {BlogContent, BlogSchema} from '~/components/Blogs';

export default function Blog() {
  const content = [
    {
      type: 'text',
      content: [
        'This Privacy Policy describes how vianisa.com (the “Site” or “we”) collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.',
      ],
      className: '!mb-0',
    },
    {
      type: 'xLargeTitle',
      content: 'COLLECTING PERSONAL INFORMATION',
    },
    {
      type: 'text',
      content: [
        'When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information that can uniquely identify an individual (including the information below) as “Personal Information”. See the list below for more information about what Personal Information we collect and why.',
      ],
    },
    {
      type: 'text',
      content: ['Device information'],
      className: 'underline',
    },
    {
      type: 'list',
      content: [
        {
          type: 'combinedText',
          content: [
            'Examples of Personal Information collected: ',
            'version of web browser, IP address, time zone, cookie information, what sites or products you view, search terms, and how you interact with the Site.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: [
            'Purpose of collection: ',
            'to load the Site accurately for you, and to perform analytics on Site usage to optimize our Site.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: [
            'Source of collection: ',
            'Collected automatically when you access our Site using cookies, log files, web beacons, tags, or pixels.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: [
            'Disclosure for a business purpose: ',
            'shared with our processor Shopify.',
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
      content: ['Order information'],
      className: 'underline',
    },
    {
      type: 'list',
      content: [
        {
          type: 'combinedText',
          content: [
            'Examples of Personal Information collected: ',
            'name, billing address, shipping address, payment information (including credit card numbers, email address, and phone number.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: [
            'Purpose of collection: ',
            'to provide products or services to you to fulfill our contract, to process your payment information, arrange for shipping, and provide you with invoices and/or order confirmations, communicate with you, screen our orders for potential risk or fraud, and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: ['Source of collection: ', 'collected from you.'],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: [
            'Disclosure for a business purpose: ',
            'shared with our processor Shopify.',
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
      content: ['Customer support information'],
      className: 'underline',
    },
    {
      type: 'list',
      content: [
        {
          type: 'combinedText',
          content: [
            'Examples of Personal Information collected: ',
            'Name, email address, phone number, and shipping address.',
          ],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: ['Purpose of collection: ', 'to provide customer support.'],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: ['Source of collection: ', 'collected from you.'],
          classNames: {
            text: 'first:font-optima-medium',
            wrapper: '!mb-0',
          },
        },
      ],
      classNames: {
        list: '!mb-0',
      },
    },
    {
      type: 'xLargeTitle',
      content: 'SHARING PERSONAL INFORMATION',
    },
    {
      type: 'text',
      content: [
        'We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you, as described above. For example:',
      ],
    },
    {
      type: 'list',
      content: [
        {
          type: 'combinedText',
          content: [
            'We use Shopify to power our online store. You can read more about how Shopify uses your Personal Information here: ',
            {
              type: 'link',
              content: {
                text: 'https://www.shopify.com/legal/privacy',
                href: 'https://www.shopify.com/legal/privacy',
                target: '_blank',
              },
            },
            '.',
          ],
          classNames: {
            wrapper: '!mb-0',
          },
        },
        'We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.',
      ],
      classNames: {
        list: '!mb-0',
      },
    },
    {
      type: 'xLargeTitle',
      content: 'BEHAVIOURAL ADVERTISING',
    },
    {
      type: 'text',
      content: [
        'As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For example:',
      ],
    },
    {
      type: 'list',
      content: [
        {
          type: 'combinedText',
          content: [
            'We use Google Analytics to help us understand how our customers use the Site. You can read more about how Google uses your Personal Information here: ',
            {
              type: 'link',
              content: {
                text: 'https://policies.google.com/privacy?hl=en',
                href: 'https://policies.google.com/privacy?hl=en',
                target: '_blank',
              },
            },
            '. You can also opt-out of Google Analytics here: ',
            {
              type: 'link',
              content: {
                text: 'https://tools.google.com/dlpage/gaoptout',
                href: 'https://tools.google.com/dlpage/gaoptout',
                target: '_blank',
              },
            },
            '.',
          ],
          classNames: {
            wrapper: '!mb-0',
          },
        },
        'We share information about your use of the Site, your purchases, and your interaction with our ads on other websites with our advertising partners. We collect and share some of this information directly with our advertising partners, and in some cases through the use of cookies or other similar technologies (which you may consent to, depending on your location).',
      ],
    },
    {
      type: 'combinedText',
      content: [
        'For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at ',
        {
          type: 'link',
          content: {
            text: 'http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work',
            href: 'http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work',
            target: '_blank',
          },
        },
        '.',
      ],
    },
    {
      type: 'text',
      content: ['You can opt out of targeted advertising by:'],
    },
    {
      type: 'list',
      content: [
        {
          type: 'combinedText',
          content: [
            'Facebook - ',
            {
              type: 'link',
              content: {
                text: 'https://www.facebook.com/settings/?tab=ads',
                href: 'https://www.facebook.com/settings/?tab=ads',
                target: '_blank',
              },
            },
          ],
          classNames: {
            text: 'first:uppercase first:italic',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: [
            'Google - ',
            {
              type: 'link',
              content: {
                text: 'https://www.google.com/settings/ads/anonymous',
                href: 'https://www.google.com/settings/ads/anonymous',
                target: '_blank',
              },
            },
          ],
          classNames: {
            text: 'first:uppercase first:italic',
            wrapper: '!mb-0',
          },
        },
        {
          type: 'combinedText',
          content: [
            'Bing - ',
            {
              type: 'link',
              content: {
                text: 'https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads',
                href: 'https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads',
                target: '_blank',
              },
            },
          ],
          classNames: {
            text: 'first:uppercase first:italic',
            wrapper: '!mb-0',
          },
        },
      ],
    },
    {
      type: 'combinedText',
      content: [
        'Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at: ',
        {
          type: 'link',
          content: {
            text: 'http://optout.aboutads.info/',
            href: 'http://optout.aboutads.info/',
            target: '_blank',
          },
        },
      ],
      classNames: {
        wrapper: '!mb-0',
      },
    },
    {
      type: 'xLargeTitle',
      content: 'LAWFUL BASIS',
    },
    {
      type: 'text',
      content: [
        'Pursuant to the General Data Protection Regulation (“GDPR”), if you are a resident of the European Economic Area (“EEA”), we process your personal information under the following lawful bases:',
      ],
    },
    {
      type: 'list',
      content: [
        'Your consent;',
        'The performance of the contract between you and the Site;',
        'Compliance with our legal obligations;',
        'To protect your vital interests;',
        'To perform a task carried out in the public interest;',
        'For our legitimate interests, which do not override your fundamental rights and freedoms.',
      ],
      classNames: {
        list: '!mb-0',
      },
    },
    {
      type: 'xLargeTitle',
      content: 'RETENTION',
    },
    {
      type: 'text',
      content: [
        'When you place an order through the Site, we will retain your Personal Information for our records unless and until you ask us to erase this information. For more information on your right of erasure, please see the ‘Your rights’ section below.',
      ],
      className: '!mb-0',
    },
    {
      type: 'xLargeTitle',
      content: 'AUTOMATIC DECISION-MAKING',
    },
    {
      type: 'text',
      content: [
        'If you are a resident of the EEA, you have the right to object to processing based solely on automated decision-making (which includes profiling), when that decision-making has a legal effect on you or otherwise significantly affects you.',
        'We do engage in fully automated decision-making that has a legal or otherwise significant effect using customer data.',
        'Our processor Shopify uses limited automated decision-making to prevent fraud that does not have a legal or otherwise significant effect on you.',
        'Services that include elements of automated decision-making include:',
      ],
    },
    {
      type: 'list',
      content: [
        'Temporary denylist of IP addresses associated with repeated failed transactions. This denylist persists for a small number of hours.',
        'Temporary denylist of credit cards associated with denylisted IP addresses. This denylist persists for a small number of days.',
      ],
      classNames: {
        list: '!mb-0',
      },
    },
    {
      type: 'xLargeTitle',
      content: 'YOUR RIGHTS',
      className: '!mb-0',
    },
    {
      type: 'largeTitle',
      content: 'GDPR',
      tag: 'h3',
    },
    {
      type: 'text',
      content: [
        'If you are a resident of the EEA, you have the right to access the Personal Information we hold about you, to port it to a new service, and to ask that your Personal Information be corrected, updated, or erased. If you would like to exercise these rights, please contact us through the contact information below.',
      ],
    },
    {
      type: 'combinedText',
      content: [
        'Your Personal Information will be initially processed in Ireland and then will be transferred outside of Europe for storage and further processing, including to Canada and the United States. For more information on how data transfers comply with the GDPR, see Shopify’s GDPR Whitepaper: ',
        {
          type: 'link',
          content: {
            text: 'https://help.shopify.com/en/manual/your-account/privacy/GDPR',
            href: 'https://help.shopify.com/en/manual/your-account/privacy/GDPR',
            target: '_blank',
          },
        },
        '.',
      ],
      classNames: {
        wrapper: '!mb-0',
      },
    },
    {
      type: 'largeTitle',
      content: 'CCPA',
      tag: 'h3',
    },
    {
      type: 'text',
      content: [
        'If you are a resident of California, you have the right to access the Personal Information we hold about you (also known as the ‘Right to Know’), to port it to a new service, and to ask that your Personal Information be corrected, updated, or erased. If you would like to exercise these rights, please contact us through the contact information below.',
        'If you would like to designate an authorized agent to submit these requests on your behalf, please contact us at the address below.',
      ],
      className: '!mb-0',
    },
    {
      type: 'xLargeTitle',
      content: 'COOKIES',
    },
    {
      type: 'text',
      content: [
        'A cookie is a small amount of information that’s downloaded to your computer or device when you visit our Site. We use a number of different cookies, including functional, performance, advertising, and social media or content cookies. Cookies make your browsing experience better by allowing the website to remember your actions and preferences (such as login and region selection). This means you don’t have to re-enter this information each time you return to the site or browse from one page to another. Cookies also provide information on how people use the website, for instance whether it’s their first time visiting or if they are a frequent visitor.',
        'We use the following cookies to optimize your experience on our Site and to provide our services.',
      ],
      className: '!mb-0',
    },
    {
      type: 'largeTitle',
      content: 'COOKIES NECESSARY FOR THE FUNCTIONING OF THE STORE',
      tag: 'h3',
    },
    {
      type: 'table',
      content: {
        columnTitles: ['Name', 'Function'],
        data: [
          ['_ab', 'Used in connection with access to admin.'],
          [
            '_secure_session_id',
            'Used in connection with navigation through a storefront.',
          ],
          ['cart', 'Used in connection with shopping cart.'],
          ['cart_sig', 'Used in connection with checkout.'],
          ['cart_ts', 'Used in connection with checkout.'],
          ['checkout_token', 'Used in connection with checkout.'],
          ['secret', 'Used in connection with checkout.'],
          ['secure_customer_sig', 'Used in connection with customer login.'],
          ['storefront_digest', 'Used in connection with customer login.'],
          [
            '_shopify_u',
            'Used to facilitate updating customer account information.',
          ],
        ],
        cellAlign: 'left',
        titleAlign: 'left',
        classNames: {
          columnTitle: 'uppercase',
        },
      },
    },
    {
      type: 'largeTitle',
      content: 'REPORTING AND ANALYTICS',
      tag: 'h3',
    },
    {
      type: 'table',
      content: {
        columnTitles: ['Name', 'Function'],
        data: [
          ['_tracking_consent', 'Tracking preferences.'],
          ['_landing_page', 'Track landing pages.'],
          ['_orig_referrer', 'Track landing pages.'],
          ['_s', 'Shopify analytics.'],
          ['_shopify_fs', 'Shopify analytics.'],
          ['_shopify_s', 'Shopify analytics.'],
          [
            '_shopify_sa_p',
            'Shopify analytics relating to marketing & referrals.',
          ],
          [
            '_shopify_sa_t',
            'Shopify analytics relating to marketing & referrals.',
          ],
          ['_shopify_y', 'Shopify analytics.'],
          ['_y', 'Shopify analytics.'],
        ],
        cellAlign: 'left',
        titleAlign: 'left',
        classNames: {
          columnTitle: 'uppercase',
        },
      },
    },
    {
      type: 'space',
    },
    {
      type: 'text',
      content: [
        'The length of time that a cookie remains on your computer or mobile device depends on whether it is a “persistent” or “session” cookie. Session cookies last until you stop browsing and persistent cookies last until they expire or are deleted. Most of the cookies we use are persistent and will expire between 30 minutes and two years from the date they are downloaded to your device.',
        'You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can negatively impact your user experience and parts of our website may no longer be fully accessible.',
      ],
    },
    {
      type: 'combinedText',
      content: [
        'Most browsers automatically accept cookies, but you can choose whether or not to accept cookies through your browser controls, often found in your browser’s “Tools” or “Preferences” menu. For more information on how to modify your browser settings or how to block, manage or filter cookies can be found in your browser’s help file or through such sites as ',
        {
          type: 'link',
          content: {
            text: 'www.allaboutcookies.org',
            href: 'www.allaboutcookies.org',
            target: '_blank',
          },
        },
        '.',
      ],
    },
    {
      type: 'text',
      content: [
        'Additionally, please note that blocking cookies may not completely prevent how we share information with third parties such as our advertising partners. To exercise your rights or opt-out of certain uses of your information by these parties, please follow the instructions in the “Behavioural Advertising” section above.',
      ],
      className: '!mb-0',
    },
    {
      type: 'largeTitle',
      content: 'DO NOT TRACK',
      tag: 'h3',
    },
    {
      type: 'text',
      content: [
        'Please note that because there is no consistent industry understanding of how to respond to “Do Not Track” signals, we do not alter our data collection and usage practices when we detect such a signal from your browser.',
      ],
      className: '!mb-0',
    },
    {
      type: 'xLargeTitle',
      content: 'CHANGES',
    },
    {
      type: 'text',
      content: [
        'We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.',
      ],
      className: '!mb-0',
    },
    {
      type: 'xLargeTitle',
      content: 'CONTACT',
    },
    {
      type: 'text',
      content: [
        'For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at hello@vianisa.com or by mail using the details provided below:',
        'BULTE MÜCEVHERAT TİCARET LİMİTED ŞİRKETİ',
        '98 Cuttermill Road, Suite 466, Great Neck NY 11021, United States',
        'Last updated: September 22th, 2020',
      ],
    },
    {
      type: 'combinedText',
      content: [
        'If you are not satisfied with our response to your complaint, you have the right to lodge your complaint with the relevant data protection authority. You can contact your local data protection authority, or our supervisory authority here: ',
        {
          type: 'link',
          content: {
            text: 'https://ico.org.uk/make-a-complaint/',
            href: 'https://ico.org.uk/make-a-complaint/',
            target: '_blank',
          },
        },
        '.',
      ],
      classNames: {
        wrapper: '!mb-0',
      },
    },
  ];

  return (
    <BlogSchema title="privacy policy">
      <BlogContent content={content} />
    </BlogSchema>
  );
}
