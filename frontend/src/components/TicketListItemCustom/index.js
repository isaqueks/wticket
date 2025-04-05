// import React, { useContext, useEffect, useRef, useState } from "react";

// import clsx from "clsx";
// import { format, isSameDay, parseISO } from "date-fns";
// import { useHistory, useParams } from "react-router-dom";

// import Avatar from "@material-ui/core/Avatar";
// import Badge from "@material-ui/core/Badge";
// import Box from "@material-ui/core/Box";
// import Divider from "@material-ui/core/Divider";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
// import ListItemText from "@material-ui/core/ListItemText";
// import Typography from "@material-ui/core/Typography";
// import { blue, green, grey } from "@material-ui/core/colors";
// import { makeStyles } from "@material-ui/core/styles";

// import { i18n } from "../../translate/i18n";

// import { Tooltip } from "@material-ui/core";
// import { v4 as uuidv4 } from "uuid";
// import { AuthContext } from "../../context/Auth/AuthContext";
// import { TicketsContext } from "../../context/Tickets/TicketsContext";
// import toastError from "../../errors/toastError";
// import api from "../../services/api";
// import ButtonWithSpinner from "../ButtonWithSpinner";
// import MarkdownWrapper from "../MarkdownWrapper";

// import AndroidIcon from "@material-ui/icons/Android";
// import VisibilityIcon from "@material-ui/icons/Visibility";
// import ContactTag from "../ContactTag";
// import TicketMessagesDialog from "../TicketMessagesDialog";

// const useStyles = makeStyles((theme) => ({
//   ticket: {
//     position: "relative",
//   },

//   pendingTicket: {
//     cursor: "unset",
//   },
//   queueTag: {
//     background: "#FCFCFC",
//     color: "#000",
//     marginRight: 1,
//     padding: 1,
//     fontWeight: 'bold',
//     paddingLeft: 5,
//     paddingRight: 5,
//     borderRadius: 3,
//     fontSize: "0.8em",
//     whiteSpace: "nowrap"
//   },
//   noTicketsDiv: {
//     display: "flex",
//     height: "100px",
//     margin: 40,
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   newMessagesCount: {
//     position: "absolute",
//     alignSelf: "center",
//     marginRight: 8,
//     marginLeft: "auto",
//     top: "10px",
//     left: "20px",
//     borderRadius: 0,
//   },
//   noTicketsText: {
//     textAlign: "center",
//     color: "rgb(104, 121, 146)",
//     fontSize: "14px",
//     lineHeight: "1.4",
//   },
//   connectionTag: {
//     background: "green",
//     color: "#FFF",
//     marginRight: 1,
//     padding: 1,
//     fontWeight: 'bold',
//     paddingLeft: 5,
//     paddingRight: 5,
//     borderRadius: 3,
//     fontSize: "0.8em",
//     whiteSpace: "nowrap"
//   },
//   noTicketsTitle: {
//     textAlign: "center",
//     fontSize: "16px",
//     fontWeight: "600",
//     margin: "0px",
//   },

//   contactNameWrapper: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginLeft: "5px",
//   },

//   lastMessageTime: {
//     justifySelf: "flex-end",
//     textAlign: "right",
//     position: "relative",
//     top: -21,
//     background: '#333333',
//     color: '#ffffff',
//     border: '1px solid #3a3b6c',
//     borderRadius: 5,
//     padding: 1,
//     paddingLeft: 5,
//     paddingRight: 5,
//     fontSize: '0.9em',
//   },

//   closedBadge: {
//     alignSelf: "center",
//     justifySelf: "flex-end",
//     marginRight: 32,
//     marginLeft: "auto",
//   },

//   contactLastMessage: {
//     paddingRight: "0%",
//     marginLeft: "5px",
//   },


//   badgeStyle: {
//     color: "white",
//     backgroundColor: green[500],
//   },

//   acceptButton: {
//     position: "absolute",
//     right: "108px",
//   },


//   acceptButton: {
//     position: "absolute",
//     left: "50%",
//   },


//   ticketQueueColor: {
//     flex: "none",
//     width: "8px",
//     height: "100%",
//     position: "absolute",
//     top: "0%",
//     left: "0%",
//   },

//   ticketInfo: {
//     position: "relative",
//     top: -13
//   },
//   secondaryContentSecond: {
//     display: 'flex',
//     // marginTop: 5,
//     //marginLeft: "5px",
//     alignItems: "flex-start",
//     flexWrap: "wrap",
//     flexDirection: "row",
//     alignContent: "flex-start",
//   },
//   ticketInfo1: {
//     position: "relative",
//     top: 13,
//     right: 0
//   },
//   Radiusdot: {
//     "& .MuiBadge-badge": {
//       borderRadius: 2,
//       position: "inherit",
//       height: 16,
//       margin: 2,
//       padding: 3
//     },
//     "& .MuiBadge-anchorOriginTopRightRectangle": {
//       transform: "scale(1) translate(0%, -40%)",
//     },

//   }
// }));
//   {/*PLW DESIGN INSERIDO O dentro do const handleChangeTab*/}
//   const TicketListItemCustom = ({ ticket }) => {
//   const classes = useStyles();
//   const history = useHistory();
//   const [loading, setLoading] = useState(false);
//   const [ticketUser, setTicketUser] = useState(null);
//   const [ticketQueueName, setTicketQueueName] = useState(null);
//   const [ticketQueueColor, setTicketQueueColor] = useState(null);
//   const [tag, setTag] = useState([]);
//   const [whatsAppName, setWhatsAppName] = useState(null);
//   const [lastInteractionLabel, setLastInteractionLabel] = useState('');
//   const [openTicketMessageDialog, setOpenTicketMessageDialog] = useState(false);
//   const { ticketId } = useParams();
//   const isMounted = useRef(true);
//   const { setCurrentTicket } = useContext(TicketsContext);
//   const { user } = useContext(AuthContext);
//   const [verpreview, setverpreview] = useState(false);
//   const { profile } = user;

//   useEffect(() => {
//     if (ticket.userId && ticket.user) {
//       setTicketUser(ticket.user?.name?.toUpperCase());
//     }
//     setTicketQueueName(ticket.queue?.name?.toUpperCase());
//     setTicketQueueColor(ticket.queue?.color);

//     if (ticket.whatsappId && ticket.whatsapp) {
//       setWhatsAppName(ticket.whatsapp.name?.toUpperCase());
//     }

//     setTag(ticket?.tags);

//     return () => {
//       isMounted.current = false;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   {/*CÓDIGO NOVO SAUDAÇÃO*/}
//   const handleCloseTicket = async (id) => {
//     setTag(ticket?.tags);
//     setLoading(true);
//     try {
//       await api.put(`/tickets/${id}`, {
//         status: "closed",
//         userId: user?.id,
//         queueId: ticket?.queue?.id,
//         useIntegration: false,
//         promptId: null,
//         integrationId: null
//       });
//     } catch (err) {
//       setLoading(false);
//       toastError(err);
//     }
//     if (isMounted.current) {
//       setLoading(false);
//     }
//     history.push(`/tickets/`);
//   };

//   useEffect(() => {
//     const renderLastInteractionLabel = () => {
//       let labelColor = '';
//       let labelText = '';

//       if (!ticket.lastMessage) return '';

//       const lastInteractionDate = parseISO(ticket.updatedAt);
//       const currentDate = new Date();
//       const timeDifference = currentDate - lastInteractionDate;
//       const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
//       const minutesDifference = Math.floor(timeDifference / (1000 * 60));


//       if (minutesDifference >= 3 && minutesDifference <= 10) {
//         labelText = `(${minutesDifference} m atrás)`;
//         labelColor = 'green';
//       } else if (minutesDifference >= 30 && minutesDifference < 60) {
//         labelText = `(${minutesDifference} m atrás)`;
//         labelColor = 'Orange';
//       } else if (minutesDifference > 60  && hoursDifference < 24) {
//         labelText = `(${hoursDifference} h atrás)`;
//         labelColor = 'red';
//       } else if (hoursDifference >= 24) {
//         labelText = `(${Math.floor(hoursDifference / 24)} dias atrás)`;
//         labelColor = 'red';
//       }


//       return { labelText, labelColor };
//     };

//     // Função para atualizar o estado do componente
//     const updateLastInteractionLabel = () => {
//       const { labelText, labelColor } = renderLastInteractionLabel();
//       setLastInteractionLabel(
//         <Badge
//           className={classes.lastInteractionLabel}
//           style={{ color: labelColor }}
//         >
//           {labelText}
//         </Badge>
//       );
//       // Agendando a próxima atualização após 30 segundos
//       setTimeout(updateLastInteractionLabel, 30 * 1000);
//     };

//     // Inicializando a primeira atualização
//     updateLastInteractionLabel();

//   }, [ticket]); // Executando apenas uma vez ao montar o componente

//   const handleReopenTicket = async (id) => {
//     setLoading(true);
//     try {
//       await api.put(`/tickets/${id}`, {
//         status: "open",
//         userId: user?.id,
//         queueId: ticket?.queue?.id
//       });
//     } catch (err) {
//       setLoading(false);
//       toastError(err);
//     }
//     if (isMounted.current) {
//       setLoading(false);
//     }
//     history.push(`/tickets/${ticket.uuid}`);
//   };

//     const handleAcepptTicket = async (id) => {
//         setLoading(true);
//         try {
//             await api.put(`/tickets/${id}`, {
//                 status: "open",
//                 userId: user?.id,
//             });
            
//             let settingIndex;

//             try {
//                 const { data } = await api.get("/settings/");
                
//                 settingIndex = data.filter((s) => s.key === "sendGreetingAccepted");
                
//             } catch (err) {
//                 toastError(err);
                   
//             }
            
//             if (settingIndex[0].value === "enabled" && !ticket.isGroup) {
//                 handleSendMessage(ticket.id);
                
//             }

//         } catch (err) {
//             setLoading(false);
            
//             toastError(err);
//         }
//         if (isMounted.current) {
//             setLoading(false);
//         }

//         // handleChangeTab(null, "tickets");
//         // handleChangeTab(null, "open");
//         history.push(`/tickets/${ticket.uuid}`);
//     };
	
// 	    const handleSendMessage = async (id) => {
        
//         const msg = `{{ms}} *{{name}}*, meu nome é *${user?.name}* e agora vou prosseguir com seu atendimento!`;
//         const message = {
//             read: 1,
//             fromMe: true,
//             mediaUrl: "",
//             body: `*Mensagem Automática:*\n${msg.trim()}`,
//         };
//         try {
//             await api.post(`/messages/${id}`, message);
//         } catch (err) {
//             toastError(err);
            
//         }
//     };
// 	{/*CÓDIGO NOVO SAUDAÇÃO*/}

//   const handleSelectTicket = (ticket) => {
//     const code = uuidv4();
//     const { id, uuid } = ticket;
//     setCurrentTicket({ id, uuid, code });
//   };


//   const renderTicketInfo = () => {
//     if (ticketUser) {

//       return (
//         <>
//           {ticket.chatbot && (
//             <Tooltip title="Chatbot">
//               <AndroidIcon
//                 fontSize="small"
//                 style={{ color: grey[700], marginRight: 5 }}
//               />
//             </Tooltip>
//           )}

//           {/* </span> */}
//         </>
//       );
//     } else {
//       return (
//         <>
//           {ticket.chatbot && (
//             <Tooltip title="Chatbot">
//               <AndroidIcon
//                 fontSize="small"
//                 style={{ color: grey[700], marginRight: 5 }}
//               />
//             </Tooltip>
//           )}
//         </>
//       );
//     }
//   };

//   return (
//     <React.Fragment key={ticket.id}>
//       <TicketMessagesDialog
//         open={openTicketMessageDialog}

//         handleClose={() => setOpenTicketMessageDialog(false)}
//         ticketId={ticket.id}
//       ></TicketMessagesDialog>
//       <ListItem dense button
//         onClick={(e) => {
//           if (ticket.status === "pending") return;
//           handleSelectTicket(ticket);
//         }}
//         selected={ticketId && +ticketId === ticket.id}
//         className={clsx(classes.ticket, {
//           [classes.pendingTicket]: ticket.status === "pending",
//         })}
//       >
//         <Tooltip arrow placement="right" title={ticket.queue?.name?.toUpperCase() || "SEM FILA"} >
//           <span style={{ backgroundColor: ticket.queue?.color || "#7C7C7C" }} className={classes.ticketQueueColor}></span>
//         </Tooltip>
//         <ListItemAvatar>
//           {ticket.status !== "pending" ?
//             <Avatar
//               style={{
//                 marginTop: "-20px",
//                 marginLeft: "-3px",
//                 width: "55px",
//                 height: "55px",
//                 borderRadius: "10%",
//               }}
//               src={ticket?.contact?.profilePicUrl}
//             />
//             :
//             <Avatar
//               style={{
//                 marginTop: "-30px",
//                 marginLeft: "0px",
//                 width: "50px",
//                 height: "50px",
//                 borderRadius: "10%",
//               }}
//               src={ticket?.contact?.profilePicUrl}
//             />
//           }
//         </ListItemAvatar>
//         <ListItemText
//           disableTypography

//           primary={
//             <span className={classes.contactNameWrapper}>
//             <Typography
//             noWrap
//             component='span'
//             variant='body2'
//             color='textPrimary'
//           >
//             <strong>{ticket.contact.name} {lastInteractionLabel}</strong>
//         <ListItemSecondaryAction>
//           <Box className={classes.ticketInfo1}>{renderTicketInfo()}</Box>
//         </ListItemSecondaryAction>
//                 {profile === "admin" && (
//                   <Tooltip title="Espiar Conversa">
//                     <VisibilityIcon
//                       onClick={() => setOpenTicketMessageDialog(true)}
//                       fontSize="small"
//                       style={{
//                         color: blue[700],
//                         cursor: "pointer",
//                         marginLeft: 10,
//                         verticalAlign: "middle"
//                       }}
//                     />
//                   </Tooltip>
//                 )}
//               </Typography>
//         </span>

//           }
//           secondary={
//             <span className={classes.contactNameWrapper}>

//               <Typography
//                 className={classes.contactLastMessage}
//                 noWrap
//                 component="span"
//                 variant="body2"
//                 color="textSecondary"
//               > {ticket.lastMessage && ticket.lastMessage.includes('data:image/png;base64') ? 
//               <MarkdownWrapper> Localização</MarkdownWrapper> : 
//               <MarkdownWrapper>{ticket.lastMessage}</MarkdownWrapper>
//             }

//             {ticket.lastMessage && verpreview ? (
//               <>
//                 {ticket.lastMessage.includes('VCARD') ? (
//                   <MarkdownWrapper>Novo Contato recebido</MarkdownWrapper>
//                 ) : ticket.lastMessage.includes('data:image') ? (
//                   <MarkdownWrapper>Localização recebida</MarkdownWrapper>
//                 ) : (
//                   <MarkdownWrapper>
//                     {ticket.lastMessage.slice(0, 20) + '...'}
//                   </MarkdownWrapper>
//                 )}
//               </>
//             ) : (
//               <MarkdownWrapper>---</MarkdownWrapper>
//             )}

//                 <span className={classes.secondaryContentSecond} >
//                   {ticket?.whatsapp?.name ? <Badge className={classes.connectionTag}>{ticket?.whatsapp?.name?.toUpperCase()}</Badge> : <br></br>}
//                   {ticketUser ? <Badge style={{ backgroundColor: "#000000" }} className={classes.connectionTag}>{ticketUser}</Badge> : <br></br>}
//                   <Badge style={{ backgroundColor: ticket.queue?.color || "#7c7c7c" }} className={classes.connectionTag}>{ticket.queue?.name?.toUpperCase() || "SEM FILA"}</Badge>
//                 </span>
//                 <span style={{ paddingTop: "2px" }} className={classes.secondaryContentSecond} >
//                   {tag?.map((tag) => {
//                     return (
//                       <ContactTag tag={tag} key={`ticket-contact-tag-${ticket.id}-${tag.id}`} />
//                     );
//                   })}
//                 </span>
//               </Typography>

//               <Badge
//                 className={classes.newMessagesCount}
//                 badgeContent={ticket.unreadMessages}
//                 classes={{
//                   badge: classes.badgeStyle,
//                 }}
//               />
//             </span>
//           }

//         />
//         <ListItemSecondaryAction>
//           {ticket.lastMessage && (
//             <>

//               <Typography
//                 className={classes.lastMessageTime}
//                 component="span"
//                 variant="body2"
//                 color="textSecondary"
//               >

//                 {isSameDay(parseISO(ticket.updatedAt), new Date()) ? (
//                   <>{format(parseISO(ticket.updatedAt), "HH:mm")}</>
//                 ) : (
//                   <>{format(parseISO(ticket.updatedAt), "dd/MM/yyyy")}</>
//                 )}
//               </Typography>

//               <br />

//             </>
//           )}

//         </ListItemSecondaryAction>
//         <span className={classes.secondaryContentSecond} >
//           {ticket.status === "pending" && (
//             <ButtonWithSpinner
//               //color="primary"
//               style={{ backgroundColor: 'green', color: 'white', padding: '0px', bottom: '17px', borderRadius: '0px', left: '8px', fontSize: '0.6rem' }}
//               variant="contained"
//               className={classes.acceptButton}
//               size="small"
//               loading={loading}
// 			  //PLW DESIGN INSERIDO O handleChangeTab
//               onClick={e => handleAcepptTicket(ticket.id)}
//             >
//               {i18n.t("ticketsList.buttons.accept")}
//             </ButtonWithSpinner>

//           )}
//           {(ticket.status !== "closed") && (
//             <ButtonWithSpinner
//               //color="primary"
//               style={{ backgroundColor: 'red', color: 'white', padding: '0px', bottom: '0px', borderRadius: '0px', left: '8px', fontSize: '0.6rem' }}
//               variant="contained"
//               className={classes.acceptButton}
//               size="small"
//               loading={loading}
//               onClick={e => handleCloseTicket(ticket.id)}
//             >
//               {i18n.t("ticketsList.buttons.closed")}
//             </ButtonWithSpinner>

//           )}
//           {(ticket.status === "closed") && (
//             <ButtonWithSpinner
//               //color="primary"
//               style={{ backgroundColor: 'red', color: 'white', padding: '0px', bottom: '0px', borderRadius: '0px', left: '8px', fontSize: '0.6rem' }}
//               variant="contained"
//               className={classes.acceptButton}
//               size="small"
//               loading={loading}
//               onClick={e => handleReopenTicket(ticket.id)}
//             >
//               {i18n.t("ticketsList.buttons.reopen")}
//             </ButtonWithSpinner>

//           )}
//         </span>
//       </ListItem>

//       <Divider variant="inset" component="li" />
//     </React.Fragment>
//   );
// };

// export default TicketListItemCustom;

import React, { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { format, isSameDay, parseISO } from "date-fns";
import { useHistory, useParams } from "react-router-dom";

import {
  Avatar,
  Badge,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { blue, green, grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";

import AndroidIcon from "@material-ui/icons/Android";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { AuthContext } from "../../context/Auth/AuthContext";
import { TicketsContext } from "../../context/Tickets/TicketsContext";
import toastError from "../../errors/toastError";
import api from "../../services/api";
import ButtonWithSpinner from "../ButtonWithSpinner";
import MarkdownWrapper from "../MarkdownWrapper";
import ContactTag from "../ContactTag";
import TicketMessagesDialog from "../TicketMessagesDialog";

const useStyles = makeStyles((theme) => ({
  ticket: {
    position: "relative",
    backgroundColor: "#FFF",
    borderRadius: 6,
    marginBottom: 8,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    // Aumente o padding e a altura mínima para dar mais espaço
    padding: "10px 15px",
    minHeight: 90,
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
  },
  pendingTicket: {
    cursor: "unset",
  },
  // Barra colorida lateral (cor da fila)
  ticketQueueColor: {
    flex: "none",
    width: 6,
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  contactNameWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 5,
    marginBottom: 4,
  },
  contactLastMessage: {
    marginLeft: 5,
    fontSize: "0.9rem",
    maxWidth: '120px',
    overflow: 'hidden',
    display: 'inline-block'
  },
  newMessagesCount: {
    position: "absolute",
    alignSelf: "center",
    marginRight: 8,
    marginLeft: "auto",
    top: "10px",
    left: "20px",
    borderRadius: 0,
  },
  badgeStyle: {
    color: "white",
    backgroundColor: green[500],
  },
  secondaryContentSecond: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 4,
    marginLeft: 5,
    // Adiciona um "gap" para separar os badges
    gap: 4,
  },
  connectionTag: {
    background: "green",
    color: "#FFF",
    padding: "3px 7px",
    // fontWeight: "bold",
    borderRadius: 5,
    fontSize: "0.8rem",
    whiteSpace: "nowrap",
  },
  lastMessageTime: {
    background: "#333",
    color: "#fff",
    borderRadius: 5,
    padding: "3px 8px",
    fontSize: "0.8rem",
    position: "absolute",
    right: 16,
    top: 16,
  },
  // Botões de ação (ACEITAR, FINALIZAR, REABRIR)
  acceptButton: {
    backgroundColor: "#FF4B4B",
    color: "#FFF",
    fontSize: "0.75rem",
    marginLeft: 8,
    padding: "5px 12px",
    minWidth: 90,
    "&:hover": {
      backgroundColor: "#d43b3b",
    },
  },
}));

const TicketListItemCustom = ({ ticket }) => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [ticketUser, setTicketUser] = useState(null);
  const [ticketQueueName, setTicketQueueName] = useState(null);
  const [ticketQueueColor, setTicketQueueColor] = useState(null);
  const [tag, setTag] = useState([]);
  const [whatsAppName, setWhatsAppName] = useState(null);
  const [lastInteractionLabel, setLastInteractionLabel] = useState("");
  const [openTicketMessageDialog, setOpenTicketMessageDialog] = useState(false);
  const { ticketId } = useParams();
  const isMounted = useRef(true);
  const { setCurrentTicket } = useContext(TicketsContext);
  const { user } = useContext(AuthContext);
  const [verpreview] = useState(false);
  const { profile } = user;

  // Carrega dados do ticket
  useEffect(() => {
    if (ticket.userId && ticket.user) {
      setTicketUser(ticket.user?.name?.toUpperCase());
    }
    setTicketQueueName(ticket.queue?.name?.toUpperCase());
    setTicketQueueColor(ticket.queue?.color);

    if (ticket.whatsappId && ticket.whatsapp) {
      setWhatsAppName(ticket.whatsapp.name?.toUpperCase());
    }

    setTag(ticket?.tags);

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Função para fechar ticket
  const handleCloseTicket = async (id) => {
    setTag(ticket?.tags);
    setLoading(true);
    try {
      await api.put(`/tickets/${id}`, {
        status: "closed",
        userId: user?.id,
        queueId: ticket?.queue?.id,
        useIntegration: false,
        promptId: null,
        integrationId: null,
      });
    } catch (err) {
      setLoading(false);
      toastError(err);
    }
    if (isMounted.current) {
      setLoading(false);
    }
    history.push(`/tickets/`);
  };

  // Controla a exibição do tempo de última interação (atualiza a cada 30s)
  useEffect(() => {
    const renderLastInteractionLabel = () => {
      if (!ticket.lastMessage) return "";

      const lastInteractionDate = parseISO(ticket.updatedAt);
      const currentDate = new Date();
      const timeDifference = currentDate - lastInteractionDate;
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutesDifference = Math.floor(timeDifference / (1000 * 60));

      let labelText = "";
      let labelColor = "";

      if (minutesDifference >= 3 && minutesDifference <= 10) {
        labelText = `(${minutesDifference} m atrás)`;
        labelColor = "green";
      } else if (minutesDifference >= 30 && minutesDifference < 60) {
        labelText = `(${minutesDifference} m atrás)`;
        labelColor = "orange";
      } else if (minutesDifference > 60 && hoursDifference < 24) {
        labelText = `(${hoursDifference} h atrás)`;
        labelColor = "red";
      } else if (hoursDifference >= 24) {
        labelText = `(${Math.floor(hoursDifference / 24)} dias atrás)`;
        labelColor = "red";
      }

      return { labelText, labelColor };
    };

    const updateLastInteractionLabel = () => {
      const { labelText, labelColor } = renderLastInteractionLabel() || {};
      if (labelText) {
        setLastInteractionLabel(
          <Badge style={{ color: labelColor }}>{labelText}</Badge>
        );
      } else {
        setLastInteractionLabel("");
      }
      setTimeout(updateLastInteractionLabel, 30000);
    };

    updateLastInteractionLabel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticket]);

  // Função para reabrir ticket
  const handleReopenTicket = async (id) => {
    setLoading(true);
    try {
      await api.put(`/tickets/${id}`, {
        status: "open",
        userId: user?.id,
        queueId: ticket?.queue?.id,
      });
    } catch (err) {
      setLoading(false);
      toastError(err);
    }
    if (isMounted.current) {
      setLoading(false);
    }
    history.push(`/tickets/${ticket.uuid}`);
  };

  // Função para aceitar ticket
  const handleAcepptTicket = async (id) => {
    setLoading(true);
    try {
      await api.put(`/tickets/${id}`, {
        status: "open",
        userId: user?.id,
      });

      // Verifica setting para envio de saudação (opcional)
      let settingIndex;
      try {
        const { data } = await api.get("/settings/");
        settingIndex = data.filter((s) => s.key === "sendGreetingAccepted");
      } catch (err) {
        toastError(err);
      }

      if (settingIndex?.[0]?.value === "enabled" && !ticket.isGroup) {
        handleSendMessage(ticket.id);
      }
    } catch (err) {
      setLoading(false);
      toastError(err);
    }
    if (isMounted.current) {
      setLoading(false);
    }
    history.push(`/tickets/${ticket.uuid}`);
  };

  // Mensagem de saudação automática
  const handleSendMessage = async (id) => {
    const msg = `{{ms}} *{{name}}*, meu nome é *${user?.name}* e agora vou prosseguir com seu atendimento!`;
    const message = {
      read: 1,
      fromMe: true,
      mediaUrl: "",
      body: `*Mensagem Automática:*\n${msg.trim()}`,
    };
    try {
      await api.post(`/messages/${id}`, message);
    } catch (err) {
      toastError(err);
    }
  };

  // Seleciona o ticket
  const handleSelectTicket = (ticket) => {
    const code = uuidv4();
    const { id, uuid } = ticket;
    setCurrentTicket({ id, uuid, code });
  };

  // Renderiza ícones informativos (exemplo: Chatbot)
  const renderTicketInfo = () => {
    return (
      <>
        {ticket.chatbot && (
          <Tooltip title="Chatbot">
            <AndroidIcon
              fontSize="small"
              style={{ color: grey[700], marginRight: 5 }}
            />
          </Tooltip>
        )}
      </>
    );
  };

  return (
    <>
      <TicketMessagesDialog
        open={openTicketMessageDialog}
        handleClose={() => setOpenTicketMessageDialog(false)}
        ticketId={ticket.id}
      />
      <ListItem
        dense
        button
        onClick={(e) => {
          if (ticket.status === "pending") return;
          handleSelectTicket(ticket);
        }}
        selected={ticketId && +ticketId === ticket.id}
        className={clsx(classes.ticket, {
          [classes.pendingTicket]: ticket.status === "pending",
        })}
      >
        {/* Barra colorida da fila */}
        <Tooltip
          arrow
          placement="right"
          title={ticket.queue?.name?.toUpperCase() || "SEM FILA"}
        >
          <span
            style={{ backgroundColor: ticket.queue?.color || "#7C7C7C" }}
            className={classes.ticketQueueColor}
          ></span>
        </Tooltip>

        {/* Avatar do contato */}
        <ListItemAvatar>
          <Avatar
            style={{
              marginLeft: 10,
              width: 48,
              height: 48,
              borderRadius: 8,
            }}
            src={ticket?.contact?.profilePicUrl}
          />
        </ListItemAvatar>

        {/* Texto principal */}
        <ListItemText
          disableTypography
          primary={
            <div className={classes.contactNameWrapper}>
              <Typography noWrap component="span" variant="body2" color="textPrimary">
                <strong>
                  {ticket.contact.name} {lastInteractionLabel}
                </strong>
              </Typography>

              {/* Ícone de espiar conversa, se for admin */}
              {profile === "admin" && (
                <Tooltip title="Espiar Conversa">
                  <VisibilityIcon
                    onClick={() => setOpenTicketMessageDialog(true)}
                    fontSize="small"
                    style={{
                      color: blue[700],
                      cursor: "pointer",
                      marginLeft: 10,
                      verticalAlign: "middle",
                    }}
                  />
                </Tooltip>
              )}
            </div>
          }
          secondary={
            <>
              {/* Última mensagem */}
              <Typography
                className={classes.contactLastMessage}
                noWrap
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {ticket.lastMessage && !verpreview ? (
                  <MarkdownWrapper>{ticket.lastMessage}</MarkdownWrapper>
                ) : (
                  <MarkdownWrapper>---</MarkdownWrapper>
                )}
              </Typography>

              {/* Badges (ex: conexão, usuário, fila, tags) */}
              <div className={classes.secondaryContentSecond}>
                {ticket?.whatsapp?.name && (
                  <Badge className={classes.connectionTag}>
                    {ticket?.whatsapp?.name?.toUpperCase()}
                  </Badge>
                )}
                {ticketUser && (
                  <Badge
                    style={{ backgroundColor: "#000" }}
                    className={classes.connectionTag}
                  >
                    {ticketUser}
                  </Badge>
                )}
                <Badge
                  style={{
                    backgroundColor: ticket.queue?.color || "#7c7c7c",
                  }}
                  className={classes.connectionTag}
                >
                  {ticket.queue?.name?.toUpperCase() || "SEM FILA"}
                </Badge>

                {/* Se tiver tags personalizadas */}
                {tag?.map((tg) => {
                  return (
                    <ContactTag
                      tag={tg}
                      key={`ticket-contact-tag-${ticket.id}-${tg.id}`}
                    />
                  );
                })}
              </div>
            </>
          }
        />

        {/* Horário da última mensagem no canto superior direito */}
        {ticket.lastMessage && (
          <Typography
            className={classes.lastMessageTime}
            component="span"
            variant="body2"
            color="textSecondary"
          >
            {isSameDay(parseISO(ticket.updatedAt), new Date())
              ? format(parseISO(ticket.updatedAt), "HH:mm")
              : format(parseISO(ticket.updatedAt), "dd/MM/yyyy")}
          </Typography>
        )}

        {/* Ações à direita */}
        <ListItemSecondaryAction>
          {/* Quantidade de mensagens não lidas */}
          <Badge
            className={classes.newMessagesCount}
            badgeContent={ticket.unreadMessages}
            classes={{
              badge: classes.badgeStyle,
            }}
          />

          {/* Se estiver pendente, mostra "ACEITAR" */}
          {ticket.status === "pending" && (
            <ButtonWithSpinner
              className={classes.acceptButton}
              size="small"
              loading={loading}
              onClick={() => handleAcepptTicket(ticket.id)}
            >
              ACEITAR
            </ButtonWithSpinner>
          )}

          {/* Se não estiver fechado, mostra "FINALIZAR" */}
          {ticket.status !== "closed" && (
            <ButtonWithSpinner
              className={classes.acceptButton}
              size="small"
              loading={loading}
              onClick={() => handleCloseTicket(ticket.id)}
            >
              FINALIZAR
            </ButtonWithSpinner>
          )}

          {/* Se estiver fechado, mostra "REABRIR" */}
          {ticket.status === "closed" && (
            <ButtonWithSpinner
              className={classes.acceptButton}
              size="small"
              loading={loading}
              onClick={() => handleReopenTicket(ticket.id)}
            >
              REABRIR
            </ButtonWithSpinner>
          )}
        </ListItemSecondaryAction>
      </ListItem>

      {/* Divider entre os itens */}
      <Divider style={{ marginLeft: 60 }} />
    </>
  );
};

export default TicketListItemCustom;