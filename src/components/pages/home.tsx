import * as React from 'react';
import { Helmet } from 'react-helmet';
import '../../sass/components/pages/home.css'

export default class Home extends React.Component {
    render() {
        return (
            <div className="grid-container row">
                <Helmet>
                    <title>Mike Stumpf</title>
                </Helmet>
                <div className="col-sm-12">
                    <h1 className="page-title">Homepage</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt, urna vitae dapibus laoreet, lorem sem iaculis lorem, id tempor ipsum nisl eu massa. Nam egestas lobortis turpis a vehicula. Vivamus nibh justo, lobortis ut lobortis eget, pharetra faucibus eros. Integer in tempus nibh, non rhoncus elit. Maecenas commodo placerat arcu, eget pretium felis imperdiet quis. Nulla porttitor, nibh nec eleifend eleifend, massa neque tincidunt turpis, non condimentum est turpis eget augue. Nunc ut tincidunt nisi, ac sagittis lorem. Donec placerat orci ac lacus efficitur, sed ullamcorper urna commodo. Etiam vel commodo lectus. Duis consequat dapibus sollicitudin. Duis vehicula gravida posuere. Fusce fringilla sed diam at pulvinar. Fusce ultricies purus vel faucibus sagittis. Aliquam condimentum nulla at neque tempor vehicula. Pellentesque consequat mi imperdiet euismod ultricies.

                        Mauris et posuere orci. Vestibulum rhoncus ultricies augue, a pharetra magna fringilla ut. Sed dictum augue eu diam venenatis maximus. Sed condimentum elementum eros, eget aliquet tortor faucibus vel. Curabitur vitae pulvinar ipsum. Vivamus nec aliquet augue, non scelerisque felis. Cras ac cursus libero, vitae pellentesque sapien.

                        Sed nunc nibh, lacinia a malesuada eu, congue vel lacus. Ut in finibus magna, a finibus massa. In enim nulla, rutrum sit amet pretium ut, ornare egestas quam. Donec vitae nibh non lacus semper malesuada eleifend ac leo. Sed et turpis a ante egestas commodo et ac velit. Phasellus vel pellentesque massa, sed eleifend massa. Nam rhoncus est sodales sapien consequat, sed vehicula est rutrum. Sed vehicula facilisis neque. Cras urna sem, feugiat in massa condimentum, scelerisque sollicitudin enim. Praesent rutrum et tellus sit amet varius. Donec imperdiet, ex eget tempor sagittis, mi mi posuere odio, eget semper mauris nisi a nunc. Ut velit leo, convallis eu aliquet eget, ullamcorper et diam. Curabitur venenatis nisi eget pellentesque malesuada. Suspendisse pharetra non leo non placerat.

                        Cras aliquet lectus eu dolor faucibus lacinia. Nullam et viverra elit, sit amet porttitor magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam eu semper tortor. Pellentesque posuere vel elit non tincidunt. Ut sit amet magna vulputate, molestie enim eu, lacinia purus. Fusce sed lacus risus. Nunc felis diam, dignissim id eros vulputate, dignissim convallis velit. Curabitur non consequat nisl. Suspendisse id vehicula tellus, a convallis nisi. Donec sem sem, lacinia a viverra in, porta sit amet lacus. Pellentesque tempus, metus sit amet dictum feugiat, turpis lorem ullamcorper nunc, in rutrum ante massa nec metus. Nunc non nulla vel nunc facilisis efficitur.

                        Integer finibus, velit vel porttitor tempor, velit lacus rhoncus mi, eget consequat libero sapien vel leo. Quisque molestie sem sem, vitae ultricies massa pellentesque ut. Suspendisse eu vulputate arcu, ut volutpat justo. Sed efficitur metus id purus rhoncus efficitur. Vivamus eget lectus ante. Cras rutrum suscipit iaculis. Vestibulum iaculis, nulla eget faucibus efficitur, ligula velit consequat lectus, id congue nisi mauris et eros. Curabitur rhoncus et turpis sit amet imperdiet. Duis a urna non lectus rhoncus fermentum. Aenean varius augue eu consequat rhoncus. Donec eu semper ex. Vivamus dictum purus at nunc dictum dignissim. Morbi lobortis lacinia ante consectetur bibendum.
                    </p>
                </div>
            </div>
        );
    }
}
