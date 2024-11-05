import styled from "styled-components";

import { media } from "../../../../style/theme/theme";

export const SideBarwrap = styled.div`
  // color: ${(props) => props.theme.colors.cadet};
  background: #FFE2E5;
  .sidebar-container {
    width: 16vw;

    padding: 20px;
    // background-color: ${(props) => props.theme.colors.pink300};
color:${(props) => props.theme.colors.pink300}
    top: 64px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    transition: width 0.3s;

    ${media.lg`
      width: 20vw;
    `}

    ${media.md`
      width: 25vw;
      padding: 10px;
    `}

    ${media.sm`
      width: 60px;
      padding: 10px 5px;
    `}
  }

  .sidebar-logo{
  padding: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  }

  .sidebar-container.collapsed {
    width: 50px;
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;

    ${media.sm`
      margin-bottom: 1rem;
    `}
  }

  .sidebar-logo {
    width: 80%;
    max-width: 150px;

    ${media.md`
      max-width: 100px;
    `}

    ${media.sm`
      display: none;
    `}
  }

  .menu-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 16px;
    color: var(--black-color);
    border-radius: 12px;
    transition: background 0.3s, color 0.3s;
    font-size: 0.95rem;

    &.active {
      background-color: #000000;
      color: #FFFAF1;

      .menu-icon {
        color: #FFFAF1;
        // background: #000000;
        border-radius: 8px;
        padding: 4px;
      }
    }

    &:hover {
      background-color: var(--gray700-color);
      color: var(--white-color);

      .menu-icon {
        color: var(--white-color);
      }
    }
  }

  .menu-icon {
    color: var(--black-color);
    display: flex;
    justify-content: center;

    ${media.sm`
      margin: 0;
    `}
  }

  .menu-text {
    flex: 1;
    ${media.sm`
      display: none;
    `}
  }

  .toggle-button {
    display: none;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1000;

    ${media.sm`
      display: block;
    `}
  }

  /* Responsive adjustments */
  ${media.sm`
    .menu-item {
      justify-content: center;
      padding: 8px;
    }

    .menu-item .menu-text {
      display: none;
    }
  `}
`;
