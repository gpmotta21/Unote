import { motion } from 'framer-motion';
import styled  from 'styled-components'

export const AnimatedPages = ({children, className, animations}) => {
    return(
        <StyledPages className={className} variants={animations} initial='initial' animate='animate' exit='exit' transition={{duration: 1}}>
            {children}
        </StyledPages>
    )
}

const StyledPages = styled(motion.div)`
`