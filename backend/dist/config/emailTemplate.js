import * as env from "dotenv";
env.config();
export const getEmail = ({ header, body, buttonHref, buttonText, }) => {
    return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Mental Health App</title>
        <!--[if mso]>
        <style type="text/css">
            body, table, td, h1, p, a {font-family: Arial, Helvetica, sans-serif !important;}
            a {text-decoration: none;}
            .button-td {padding: 15px 35px !important;}
            .button-a {font-size: 16px !important; font-weight: bold !important; line-height: 1 !important;}
        </style>
        <![endif]-->
        <style type="text/css">
            body, #bodyTable { margin: 0; padding: 0; width: 100% !important; font-family: Verdana, Geneva, Tahoma, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
            p { margin: 0 0 1em 0; }
            a { text-decoration: none; }
            h1 { margin: 0 0 0.75em 0; }
            .body-bg { background-color: #f0fdfa; }
            .container-table { max-width: 600px; width: 100%; margin: 0 auto; }
            .content-card { background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 25px rgba(0, 128, 128, 0.1); overflow: hidden; }
            .card-padding { padding: 35px 30px 40px 30px; }
            .icon-animated { width: 72px; height: 72px; margin-bottom: 20px; border-radius: 50%; display: block; margin-left:auto; margin-right:auto; }
            .header-title { color: #0f766e; font-size: 26px; font-weight: bold; margin: 15px 0 10px 0; line-height: 1.3; }
            .body-text { color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 25px; }
            .subtle-text { color: #64748b; font-size: 14px; line-height: 1.5; }
            .button-td { padding: 15px 35px; border-radius: 10px; text-align: center; }
            .button-a { display: inline-block; color: #ffffff !important; font-size: 16px; font-weight: 600; text-decoration: none; line-height: 1; padding: 1px; }
            .button-a:hover { opacity: 0.9; }
            .footer-text { text-align: center; color: #94a3b8; font-size: 12px; margin-top: 25px; line-height: 1.4; }
            @media screen and (max-width: 600px) {
                .container-table { width: 100% !important; max-width: none !important; }
                .card-padding { padding: 25px 20px 30px 20px !important; }
                .header-title { font-size: 22px !important; }
                .body-text { font-size: 15px !important; }
                .button-td { padding: 14px 25px !important; }
                .button-a { font-size: 15px !important; }
            }
        </style>
    </head>
    <body class="body-bg" style="margin: 0; padding: 0; background-color: #f0fdfa;">
        <table role="presentation" id="bodyTable" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0; padding: 0; width: 100% !important;" bgcolor="#f0fdfa">
            <tr>
                <td align="center" style="padding: 40px 10px;">
                    <table role="presentation" class="container-table" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; margin: 0 auto;">
                        <tr>
                            <td>
                                <table role="presentation" class="content-card" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 25px rgba(0, 128, 128, 0.1);">
                                    <tr>
                                        <td align="center" class="card-padding" style="padding: 35px 30px 40px 30px;">
                                            <h1 class="header-title" style="color: #0f766e; font-size: 26px; font-weight: bold; margin: 15px 0 10px 0; line-height: 1.3;">${header}</h1>
                                            <p class="body-text" style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                                                ${body}
                                            </p>
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 30px 0;">
                                                <tr>
                                                    <td class="button-td" align="center" style="border-radius: 10px; padding: 15px 35px;" bgcolor="#14b8a6">
                                                    <!--[if mso]>
                                                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${process.env.FRONTEND_BASE_URL}${buttonHref}" style="height:50px; v-text-anchor:middle; width:250px;" arcsize="20%" strokecolor="#14b8a6" fillcolor="#14b8a6">
                                                        <w:anchorlock/>
                                                        <center style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold;">${buttonText}</center>
                                                    </v:roundrect>
                                                    <![endif]-->
                                                    <!--[if !mso]> <!-->
                                                    <a href="${process.env.FRONTEND_BASE_URL}${buttonHref}" target="_blank" class="button-a" style="background: linear-gradient(to right, #14b8a6, #06b6d4); background-color: #14b8a6; border-radius: 10px; display: inline-block; color: #ffffff !important; font-size: 16px; font-weight: 600; text-decoration: none; line-height: 1; text-align: center; padding: 1px; border: 1px solid #14b8a6;">
                                                        <span style="display: inline-block; padding: 14px 34px;">${buttonText}</span>
                                                    </a>
                                                    <!--<![endif]-->
                                                    </td>
                                                </tr>
                                            </table>
                                            <p class="subtle-text" style="color: #64748b; font-size: 14px; line-height: 1.5;">
                                                Jika Anda tidak merasa melakukan ini, mohon abaikan email ini demi keamanan Anda.
                                            </p>
                                            <p class="subtle-text" style="margin-top:15px; color: #64748b; font-size: 12px;">
                                                Jika tombol tidak berfungsi, salin dan tempel URL ini di browser Anda:<br>
                                                <a href="${process.env.FRONTEND_BASE_URL}${buttonHref}" style="color: #0891b2; text-decoration: underline; word-break: break-all;">${process.env.FRONTEND_BASE_URL}/email-verify?token=...</a>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" class="footer-text" style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 50px; padding: 0 10px; line-height: 1.4;">
                                Anda menerima email ini karena mendaftar di Mental Health App.<br>
                                © 2025 Mental Health App. Seluruh Hak Cipta Dilindungi Undang-Undang.
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};
