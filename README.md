## Tech-Support-Portal

### Technologies Implemented 
#### Front-End: HTML, CSS, Javascript, ReactJS, Auth0
#### Back-End: NodeJS, MongoDB, NodeMailer

## Project Description
### Tech-Support Portal Simulation  
#### Client Side
##### Client reports a technical issues by submitting an Incident ticket and entering the required information.
##### Client authenticates to the portal with their gmail or hotmail account through Auth0-Firebase
##### If client has no account, they are re-directed to a sign up page with email information pre-populated, else they are directed to ticketing system
##### Client can see their current and past tickets.
##### Client can enter or request updates, which are added to the ticket
##### Client sees updates added to their tickets by technical supporters as well as ticket status (Open, In Progress, Closed)
##### Client receives updates though email notifications (NodeMailer)


#### Support Side
##### Administrator sees all tickets and manages them by assigning to the appropriate support team
##### Administrator creates support accounts and are saved in MongoDB
##### Administrator re-assigns support members to different groups
##### Administrator can lock, unlock, disable and activate support accounts. 
##### Administrator resets passwords for supporters.
##### Administrator can re-assign tickets from one support group to another
##### Once tickets are re-assigned, they are no longer visible to the previous support group and their respective supporters
##### Supporters can only see tickets assigned to them or their group
##### Supporters signup for an account, Administrator approves the access.
##### Supporters support clients by adding updates to the tickets and client receives email notifications


