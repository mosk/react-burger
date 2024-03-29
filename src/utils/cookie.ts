export const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

type TCookieProps = any;

export const setCookie = (name: string, value: string | null, props?: TCookieProps): void => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }

  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }

  if (typeof value === "string") {
    value = encodeURIComponent(value);
  }

  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export const deleteCookie = (name: string): void => {
  setCookie(name, null, { expires: -1 });
};
