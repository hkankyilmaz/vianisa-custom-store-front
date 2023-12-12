import * as React from 'react';
import {Link} from '@remix-run/react';
import {useState} from 'react';
import {blogs} from '../../constant/collectionsblog';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function ColBlog({collection}) {
  return (
    <div role="presentation" className={className} >
     {blogs.find((xxx)=>xxx.handle==collection)? 
        blogs.find((xxx)=>xxx.handle==collection).questions.map((ques)=>{
          <QuesItem question={ques.title} answer={ques.answer}></QuesItem>
        })
     :""}
    </div>
  );
}
export default function QuesItem({question, answer}) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
   <>
    <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
   </>
  );
}
