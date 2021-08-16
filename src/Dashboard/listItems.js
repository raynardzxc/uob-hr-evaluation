import React from 'react';
import {
    ListItem, ListItemIcon, ListItemText, DashboardIcon, 

} from '../materialImports';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
  </div>
);