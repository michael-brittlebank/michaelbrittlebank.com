import { PureComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { Header } from './header';
import { Footer } from './footer';

interface Props {
  children: ReactNode;
}

interface State {
  hasMounted: boolean;
}

export class PageContainer extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasMounted: false,
    };
  }

  componentDidMount() {
    this.setState({
      hasMounted: true,
    });
  }

  render() {
    const { children } = this.props;
    const { hasMounted } = this.state;
    return (
      <>
        <Header />
        <main
          className={classNames(
            {
              opaque: !hasMounted,
            },
            'container page-container',
          )}>
          {children}
        </main>
        <Footer />
      </>
    );
  }
}
