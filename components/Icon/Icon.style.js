import styled from 'styled-components';

// insert into wrapper with size and relative position
const Icon = styled.div`
  fill: ${({ fill }) => (fill ? fill : 'currentColor')};
`;

export default Icon;
