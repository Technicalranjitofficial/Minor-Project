// "use server"
import { google } from "googleapis";




const auth = new google.auth.GoogleAuth({
  // keyFile: process.cwd() + "/crediential/crediential.json",
  credentials:{
    client_id: "117620180066157252139",
    client_email: "kiit-google-drive@elite-crossbar-374713.iam.gserviceaccount.com",
    project_id: "elite-crossbar-374713",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvEp5+6q5X9LZR\nx/Sa5o0zD/mT6buY4Wt04P/ATnr99PQ/GqH+JMaXTnubBHuneVS3V8kyfOfZOQc8\nYjbM2FsDZJ+GIHGcAPLWagp3ZGLg1UswNVBOCHmLHrrKttoVjcsALaLgi92R/YBy\nSs1VQys5pJdgTYA/iqs9NsKGtklrv0wZ9b4a5B9yzlEBUAPGU12F64eJy7QR3G9p\nXbFep6YWrCpIn/byOAFMjFvOf09fEjdZPbgFSPK217HRPe8rXONw3QHsxU4ZGCU2\nEgpGzG3JIQ5cuYki5ep+A8P3xVT0Pi/WvC/P+RNqrIFD2eHhP4rC57EJNY/yz8VX\nE1wnCZI7AgMBAAECggEADsO8OCnkkChkI9uAJnwhFlhXjQDeQFNqc43yI666sqYw\n3w2I8dz6HpKQ3A7xursByQCPSEG+b9ReZtpFktsAOfYHehFMY4K0+B4zScRejmWO\nlL86SYpvbasmx6fKFp1BrH8syFEjW4eMiJcEYBdtEsxts8J1eWZhcKUonKHM6Vgx\nyLI0QjFGtQ8Aw6aMVMrkLTPjLtBBZjEIIh1SEd/WyqCeKAHrliiLKYMyzDvdTUQE\nxES2w7zpgdc/sK4LNTgHcPr7RvPp9Oe477ZtjGrMdV5o/H1CUTtO9GvZpcNh/zaZ\nb+pcN2cVPv5nYV2M2FocWoxacXbDGgupdnsSSfSiMQKBgQDty9TElx822wTekUSe\n5dCK7lCJqv+W+PeGGQ/Ye0DFBn4NMLP5EXGCBLm6WXiTURHjhsr82SQ9kzQU9oq+\nCssKr7KOFfPaGRsHx5QDKzmcN60+9+QM84dpNoPaEQPUPj2xO10oUTtKirb6naE+\nhyHsn5AZ7Olyzb68tD2NYRjjQwKBgQC8eZNh5bUGryUGq+tXwNG0KClDUKB44QO+\ngk58tM9jYXMLgorhqqt6mY62yiywyxpnK3MB7O8nC/tcYgHkOiBWOtLmP3EdoAhU\nztEoF+X3H9cZgekKT/6SVjzjY3FWWT7a2UL0VJP5yH32MaRRX6EsuIvWY7XU8Z47\n51Cbi04ZqQKBgQC2bwV6GVKaPCedNSfHHBsFK1Zgd+8EfVcw6vNMKysCvTthlTbN\n48MIc+WlgNTPeIfX3ebHWzPBhbiUSJ0itZcWSLsc5NyjO1WQf14fnD7jiZeBUp8E\nDKWbY3Z+i0U7xNCBs0CCGOf7BTbiSKKXHQc6ySO9sBNdv1kQ3trGJ3L3jwKBgQCn\nSpZqL9VF0JJh4Jltc8XvTjKKAHffs4J6R/lYsbjfMnFGRyH0+mNo2AIX905BwpV1\n+9gCXodMNlNvhcK+DGYFhAMMwkUqEZEzjbuTBdtmRcnMZ0YtlCGXTJqRDwRbq62h\n3XSToLsT3EUKELgUTnimVEwzCKAuGiTkcQZYegbhuQKBgGN6Dq2iJvAYNT9Rqy/y\nGoEIvNmr2w7fqRf3/HaVh2bGuxLfT+vzwGzZy2mJ6RjY1k/oSU9APKHxLKeafzDi\nZUsW/HZ47oX43s1QfuYwgPBakQszvHF3W8QxsOqHM2KxE6BosLUIoH+BSgAXqPWT\nUVroZaV0hkcedRBve6ztrfS1\n-----END PRIVATE KEY-----\n",
  },
  scopes: "https://www.googleapis.com/auth/drive",
});

export const drive = google.drive({
  version: "v3",
  auth: auth,
});

export const jwToken = new google.auth.JWT(
  "kiit-google-drive@elite-crossbar-374713.iam.gserviceaccount.com",
  undefined,
  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvEp5+6q5X9LZR\nx/Sa5o0zD/mT6buY4Wt04P/ATnr99PQ/GqH+JMaXTnubBHuneVS3V8kyfOfZOQc8\nYjbM2FsDZJ+GIHGcAPLWagp3ZGLg1UswNVBOCHmLHrrKttoVjcsALaLgi92R/YBy\nSs1VQys5pJdgTYA/iqs9NsKGtklrv0wZ9b4a5B9yzlEBUAPGU12F64eJy7QR3G9p\nXbFep6YWrCpIn/byOAFMjFvOf09fEjdZPbgFSPK217HRPe8rXONw3QHsxU4ZGCU2\nEgpGzG3JIQ5cuYki5ep+A8P3xVT0Pi/WvC/P+RNqrIFD2eHhP4rC57EJNY/yz8VX\nE1wnCZI7AgMBAAECggEADsO8OCnkkChkI9uAJnwhFlhXjQDeQFNqc43yI666sqYw\n3w2I8dz6HpKQ3A7xursByQCPSEG+b9ReZtpFktsAOfYHehFMY4K0+B4zScRejmWO\nlL86SYpvbasmx6fKFp1BrH8syFEjW4eMiJcEYBdtEsxts8J1eWZhcKUonKHM6Vgx\nyLI0QjFGtQ8Aw6aMVMrkLTPjLtBBZjEIIh1SEd/WyqCeKAHrliiLKYMyzDvdTUQE\nxES2w7zpgdc/sK4LNTgHcPr7RvPp9Oe477ZtjGrMdV5o/H1CUTtO9GvZpcNh/zaZ\nb+pcN2cVPv5nYV2M2FocWoxacXbDGgupdnsSSfSiMQKBgQDty9TElx822wTekUSe\n5dCK7lCJqv+W+PeGGQ/Ye0DFBn4NMLP5EXGCBLm6WXiTURHjhsr82SQ9kzQU9oq+\nCssKr7KOFfPaGRsHx5QDKzmcN60+9+QM84dpNoPaEQPUPj2xO10oUTtKirb6naE+\nhyHsn5AZ7Olyzb68tD2NYRjjQwKBgQC8eZNh5bUGryUGq+tXwNG0KClDUKB44QO+\ngk58tM9jYXMLgorhqqt6mY62yiywyxpnK3MB7O8nC/tcYgHkOiBWOtLmP3EdoAhU\nztEoF+X3H9cZgekKT/6SVjzjY3FWWT7a2UL0VJP5yH32MaRRX6EsuIvWY7XU8Z47\n51Cbi04ZqQKBgQC2bwV6GVKaPCedNSfHHBsFK1Zgd+8EfVcw6vNMKysCvTthlTbN\n48MIc+WlgNTPeIfX3ebHWzPBhbiUSJ0itZcWSLsc5NyjO1WQf14fnD7jiZeBUp8E\nDKWbY3Z+i0U7xNCBs0CCGOf7BTbiSKKXHQc6ySO9sBNdv1kQ3trGJ3L3jwKBgQCn\nSpZqL9VF0JJh4Jltc8XvTjKKAHffs4J6R/lYsbjfMnFGRyH0+mNo2AIX905BwpV1\n+9gCXodMNlNvhcK+DGYFhAMMwkUqEZEzjbuTBdtmRcnMZ0YtlCGXTJqRDwRbq62h\n3XSToLsT3EUKELgUTnimVEwzCKAuGiTkcQZYegbhuQKBgGN6Dq2iJvAYNT9Rqy/y\nGoEIvNmr2w7fqRf3/HaVh2bGuxLfT+vzwGzZy2mJ6RjY1k/oSU9APKHxLKeafzDi\nZUsW/HZ47oX43s1QfuYwgPBakQszvHF3W8QxsOqHM2KxE6BosLUIoH+BSgAXqPWT\nUVroZaV0hkcedRBve6ztrfS1\n-----END PRIVATE KEY-----\n",
  ["https://www.googleapis.com/auth/drive"],
  undefined
);
var parents = "1E8fVXMIlHhPhhWDR1h1Gi6AxKmeR-0MO";

const token =
  "ya29.a0AX9GBdWazzA81mYvlCLLBwcctUVQkUEgO9293nq0vHyZd66QGFetwp5BTlnLF2B…";

jwToken.authorize((authErr, token) => {
  if (authErr) {
    console.log("token", token);
    console.log("error : " + authErr);

    return;
  } else {
    console.log("Authorization accorded");
  }
});
