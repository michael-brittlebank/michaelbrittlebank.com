import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { AnalyticsService } from '@mikestumpf/services';
import React, { ReactNode } from 'react';

interface Props {
  content?: ReactNode;
  href: string;
  action: string;
}

export function AnalyticsButton(props: Props) {
  const { content } = props;
  const onButtonClick = () => {
    const { href, action } = props;
    AnalyticsService.event({
      action,
    });
    window.open(href, '_blank');
  };
  return (
    <button onClick={onButtonClick} className="button" type="button">
      {content || (
        <>
          View Code&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faGithub} className="fa" />
        </>
      )}
    </button>
  );
}
