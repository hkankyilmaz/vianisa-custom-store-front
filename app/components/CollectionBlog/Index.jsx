import * as React from 'react';
import {Link} from '@remix-run/react';
import {useState} from 'react';
import {blogs} from '../../constant/collectionsblog';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {Divider, Typography} from '@mui/material';
function handleClick(event) {
  event.preventDefault();
  console.log('You clicked a breadcrumb.');
}

export default function ColBlog({collection, className}) {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  let findedCol = blogs.find((blog) => blog.handle == collection.handle);
  return (
    <div role="presentation" className={className}>
      <Divider />
      <Script questions={findedCol.questions} />
      <div className="flex flex-col justify-center  min-w-full">
        <FaqContent title={blogs[0].title} content={blogs[0].content} />
        <ListItemText
          component="nav"
          className="flex cursor-pointer select-none	 flex-nowrap flex-row !justify-around items-center hover:!bg-inherit"
          onClick={handleClick}
        >
          <h3 className="text-center hover:!bg-inherit">
            {collection.title + ' FAQs'}{' '}
            {open ? (
              <ExpandLess className="max-w-[24px]" />
            ) : (
              <ExpandMore className="max-w-[24px]" />
            )}
          </h3>
        </ListItemText>
      </div>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {blogs[0].questions.map((ques) => (
            <QuesItem
              question={ques.title}
              answer={ques.answer}
              openDef={false}
            ></QuesItem>
          ))}
        </List>
      </Collapse>
    </div>
  );
}
function QuesItem({question, answer, openDef}) {
  const [open, setOpen] = React.useState(openDef);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemText
        className="cursor-pointer select-none hover:!bg-inherit focus:!bg-inherit"
        onClick={handleClick}
      >
        <h3 className="pl-4 hover:!bg-inherit focus:!bg-inherit">{question}</h3>

        {open ? (
          <ExpandLess className="max-w-[24px]" />
        ) : (
          <ExpandMore className="max-w-[24px]" />
        )}
      </ListItemText>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List className="" component="div" disablePadding>
          <ListItemText className="px-10 hover:!bg-inherit" primary={answer} />
        </List>
      </Collapse>
    </>
  );
}
function FaqContent({title, content, openDef}) {
  const [open, setOpen] = React.useState(openDef);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemText
        className="flex select-none	 flex-nowrap items-center flex-col cursor-pointer hover:!bg-inherit"
        onClick={handleClick}
      >
        <h3 className=" text-center hover:!bg-inherit">
          {title}{' '}
          {open ? (
            <ExpandLess className="max-w-[24px]" />
          ) : (
            <ExpandMore className="max-w-[24px]" />
          )}
        </h3>
      </ListItemText>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Typography variant="body1" className="px-7 hover:!bg-inherit">
          {content}
        </Typography>
      </Collapse>
    </>
  );
}
function Script({questions}) {
  let scrpt = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      questions.map((question) => {
        let newObj = new Object();
        newObj['@type'] = 'Question';
        newObj['name'] = question.title;
        newObj['acceptedAnswer'] = {};
        newObj['acceptedAnswer']['@type'] = 'Answer';
        newObj['acceptedAnswer']['text'] = question.answer;
        return newObj;
      }),
    ],
  };
  console.log(JSON.stringify(scrpt));
  return <script type="application/ld+json">{JSON.stringify(scrpt)}</script>;
}
/*
<script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Which month's birthstone is blue topaz?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "<p>Blue topaz is commonly associated with December and is considered one of the birthstones for this month.</p>"
                }
              },
              {
                "@type": "Question",
                "name": "What does Blue Topaz mean spiritually?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "<p>Blue topaz exhibits an elegant blue hue. The blue tones of this gemstone evoke a sense of calmness and tranquility, providing an inner serenity. Blue topaz is considered a stone that helps balance spiritual energy, supporting emotional strength. Additionally, it is known for enhancing creativity and boosting intellectual power.</p>"
                }
              },
              {
                "@type": "Question",
                "name": "Who should wear blue topaz?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "<p>Traditionally, individuals born under the sign of Sagittarius are recommended to wear Blue Topaz Birthstone Jewelry. The misty blue hue of topaz is distinctly linked to the chilly month of December. However, the tranquil blue of topaz is a favorite of many regardless of their birth month and sign.</p>"
                }
              },
              {
                "@type": "Question",
                "name": "Can you wear a blue topaz every day?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "<p>With a hardness rating of 8 on the Mohs scale, blue topaz exhibits resistance to scratches and other potential damage. As a result, blue topaz is considered a durable gemstone, making it well-suited for everyday wear.</p>"
                }
              }
            ]
          }
      </script>*/
