import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта pravonazemlu.ru на почту Анны Калининой"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()

    if not name or not email or not message:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните все поля'})
        }

    smtp_user = 'pravonazemlu@internet.ru'
    smtp_password = os.environ['SMTP_PASSWORD']

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта — {name}'
    msg['From'] = smtp_user
    msg['To'] = smtp_user
    msg['Reply-To'] = email

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Новая заявка с сайта PRAVONAZEMLU</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 8px; font-weight: bold; color: #666; width: 100px;">Имя:</td>
                <td style="padding: 8px; color: #333;">{name}</td>
            </tr>
            <tr style="background: #f9f9f9;">
                <td style="padding: 8px; font-weight: bold; color: #666;">Email:</td>
                <td style="padding: 8px; color: #333;"><a href="mailto:{email}">{email}</a></td>
            </tr>
            <tr>
                <td style="padding: 8px; font-weight: bold; color: #666; vertical-align: top;">Сообщение:</td>
                <td style="padding: 8px; color: #333; white-space: pre-wrap;">{message}</td>
            </tr>
        </table>
        <p style="color: #999; font-size: 12px; margin-top: 20px;">
            Ответьте на это письмо, чтобы написать клиенту на {email}
        </p>
    </div>
    """

    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, smtp_user, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }