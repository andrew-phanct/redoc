import * as React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import { RedocStandalone } from '../src';

const DEFAULT_SPEC = 'salesforce/openapi.yaml';
const NEW_VERSION_SPEC = 'openapi-3-1.yaml';

class DemoApp extends React.Component<
  Record<string, unknown>,
  { spec: object | undefined; specUrl: string; dropdownOpen: boolean; cors: boolean }
> {
  constructor(props) {
    super(props);

    let parts = window.location.search.match(/url=([^&]+)/);
    let url = DEFAULT_SPEC;
    if (parts && parts.length > 1) {
      url = decodeURIComponent(parts[1]);
    }

    parts = window.location.search.match(/[?&]nocors(&|#|$)/);
    let cors = true;
    if (parts && parts.length > 1) {
      cors = false;
    }

    this.state = {
      spec: undefined,
      specUrl: url,
      dropdownOpen: false,
      cors,
    };
  }

  handleUploadFile = (spec: object) => {
    this.setState({
      spec,
      specUrl: '',
    });
  };

  handleChange = (url: string) => {
    if (url === NEW_VERSION_SPEC) {
      this.setState({ cors: false });
      0;
    }
    this.setState({
      specUrl: url,
    });
    window.history.pushState(
      undefined,
      '',
      updateQueryStringParameter(location.search, 'url', url),
    );
  };

  toggleCors = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cors = e.currentTarget.checked;
    this.setState({
      cors,
    });
    window.history.pushState(
      undefined,
      '',
      updateQueryStringParameter(location.search, 'nocors', cors ? undefined : ''),
    );
  };

  render() {
    const { specUrl, cors } = this.state;
    let proxiedUrl = specUrl;
    if (specUrl !== DEFAULT_SPEC) {
      proxiedUrl = cors
        ? 'https://cors.redoc.ly/' + new URL(specUrl, window.location.href).href
        : specUrl;
    }
    return (
      <>
        <RedocStandalone
          spec={this.state.spec}
          specUrl={proxiedUrl}
          options={{ scrollYOffset: 'nav', untrustedSpec: true }}
        />
      </>
    );
  }
}

/* ====== Styled components ====== */

render(<DemoApp />, document.getElementById('container'));

/* ====== Helpers ====== */
function updateQueryStringParameter(uri, key, value) {
  const keyValue = value === '' ? key : key + '=' + value;
  const re = new RegExp('([?|&])' + key + '=?.*?(&|#|$)', 'i');
  if (uri.match(re)) {
    if (value !== undefined) {
      return uri.replace(re, '$1' + keyValue + '$2');
    } else {
      return uri.replace(re, (_, separator: string, rest: string) => {
        if (rest.startsWith('&')) {
          rest = rest.substring(1);
        }
        return separator === '&' ? rest : separator + rest;
      });
    }
  } else {
    if (value === undefined) {
      return uri;
    }
    let hash = '';
    if (uri.indexOf('#') !== -1) {
      hash = uri.replace(/.*#/, '#');
      uri = uri.replace(/#.*/, '');
    }
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';
    return uri + separator + keyValue + hash;
  }
}
