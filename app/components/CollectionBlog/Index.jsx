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
import {Typography} from '@mui/material';
function handleClick(event) {
  event.preventDefault();
  console.log('You clicked a breadcrumb.');
}

export default function ColBlog({collection, className}) {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div role="presentation" className={className}>
      <FaqContent title={blogs[0].title} content={blogs[0].content} />
      <ListItemButton
        component="nav"
        className="flex flex-nowrap flex-row !justify-around items-center hover:!bg-inherit"
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
      </ListItemButton>
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
      <ListItemButton
        className="hover:!bg-inherit focus:!bg-inherit"
        onClick={handleClick}
      >
        <ListItemText
          className="pl-4 hover:!bg-inherit focus:!bg-inherit"
          primary={question}
        />

        {open ? (
          <ExpandLess className="max-w-[24px]" />
        ) : (
          <ExpandMore className="max-w-[24px]" />
        )}
      </ListItemButton>
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
      <ListItemButton className="flex hover:!bg-inherit" onClick={handleClick}>
        <ListItemText className="text-center hover:!bg-inherit">
          {title}{' '}
          {open ? (
            <ExpandLess className="max-w-[24px]" />
          ) : (
            <ExpandMore className="max-w-[24px]" />
          )}
        </ListItemText>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Typography className="px-7 hover:!bg-inherit">{content}</Typography>
      </Collapse>
    </>
  );
}
