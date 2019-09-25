<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width"/>

    <!-- For development, pass document through inliner -->
    <link rel="stylesheet" href="css/simple.css">

    <style type="text/css">

* { margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif; line-height: 1.65; }

img { max-width: 100%; margin: 0 auto; display: block; }

body, .body-wrap { width: 100% !important; height: 100%; background: #f8f8f8; }

a { color: #71bc37; text-decoration: none; }

a:hover { text-decoration: underline; }

.text-center { text-align: center; }

.text-right { text-align: right; }

.text-left { text-align: left; }

.button { display: inline-block; color: white; background: #71bc37; border: solid #71bc37; border-width: 10px 20px 8px; font-weight: bold; border-radius: 4px; }

.button:hover { text-decoration: none; }

h1, h2, h3, h4, h5, h6 { margin-bottom: 20px; line-height: 1.25; }

h1 { font-size: 32px; }

h2 { font-size: 28px; }

h3 { font-size: 24px; }

h4 { font-size: 20px; }

h5 { font-size: 16px; }

p, ul, ol { font-size: 16px; font-weight: normal; margin-bottom: 20px; }

.container { display: block !important; clear: both !important; margin: 0 auto !important; max-width: 580px !important; }

.container table { width: 100% !important; border-collapse: collapse; }

.container .masthead { padding: 80px 0; background: #002060; color: white; }

.container .masthead h1 { margin: 0 auto !important; max-width: 90%; text-transform: uppercase; }

.container .content { background: white; padding: 30px 35px; }

.container .content h2 span{ color:#71bc37}

.container .content.footer { background: none; }
/*style="display:flex;justify-content:center"*/
.container .content.footer p { margin-bottom: 0; color: #888; text-align: center; font-size: 14px; }

.container .content.footer .social {display:flex;justify-content: center; text-align:center}

.container .content.footer .social img {margin:0px;padding:0 10px 0 10px; text-align:center}

.container .content.footer a { color: #888; text-decoration: none; font-weight: bold; }

.container .content.footer a:hover { text-decoration: underline; }


    </style>
</head>
<body>
<table class="body-wrap">
    <tr>
        <td class="container">

            <!-- Message start -->
            <table>
                <tr>
                    <td align="center">

                        <h1><img src="https://firebasestorage.googleapis.com/v0/b/giveasily.appspot.com/o/organisation_logo%2F69ff2ec6-c85c-4491-9b73-32759fee482e.png?alt=media&token=c3ccb3c5-d291-4bd5-87f7-8d4c778f1feb" width="50"/></h1>

                    </td>
                </tr>
                <tr>
                    <td align="center" class="masthead">

                        <h1>You received a Donation.</h1>

                    </td>
                </tr>
                <tr>
                    <td class="content">

                        <h2>Hello <span >${business_name}</span>,</h2>

                        <p>
                            We are so excited to inform you that we have received a donation of ${amount} Naira on your behalf. We ae super excited for this because we realize that every donation made to you  gives you that extra impetus to keep doing the good work you already are doing. Thank you for being with us.

                            <p>Our Regards,<br />
                               Giveasily Team.</p>

                        </p>

                        <table>
                            <tr>
                                <td align="center">
                                    <p>
                                        <a style="color:#fff" href="${baseUrl}/dashboard/donations/${id}" class="button">View Donation</a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>

        </td>
    </tr>
    <tr>
        <td class="container">

            <!-- Message start -->
            <table>
                <tr>
                    <td class="content footer" align="center">
                        <p>Sent by <a href="${baseUrl}">Giveasily Ltd</a>, 113 Allen Avenue Ikeja, Lagos, Nigeria</p>
                        <p><a href="mailto:">hello@giveasily.com</a> | <a href="#">Get In touch</a></p>
                    </td>
                <tr>
                    <td>
                        <p  class="content footer social" align="center">
                            <img alt="facebook"  src="${baseUrl}/img/facebook_small.png"/>
                            <img alt="twitter"   src="${baseUrl}/img/twitter_small.png" />
                        </p>
                    </td>
                </tr>
                </tr>
            </table>

        </td>
    </tr>
</table>
</body>
</html>