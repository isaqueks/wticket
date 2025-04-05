import { styled } from '@mui/joy/styles';
import Paper from '@material-ui/core/Paper';

const TicketAdvancedLayout = styled(Paper)({
    height: `calc(100% - 48px)`,
    display: "grid",
    gridTemplateRows: "56px 1fr"
})

export default TicketAdvancedLayout;