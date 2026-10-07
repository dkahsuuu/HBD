import os

filepath = 'script.js'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

import re
old_msg_pattern = r'const message = `.*?`;'

new_msg = """const message = `Happy Birthday meri jaan! 🎂❤️

Pata hai, tumhare birthday par sab log tumhe wish karenge, tumhari tareef karenge, aur kahenge ki tum kitni special ho...
main bas itna kehna chahta hoon ki meri life mein tumhara hona hi apne aap mein ek khoobsurat coincidence hai. 🥺

Tumhare saath har cheez thodi zyada special lagti hai —
random si baatein, bina matlab ki hasi, choti-choti nok-jhok, aur woh moments jinka koi reason bhi nahi hota. ❤️

Aaj tumhara birthday hai, isliye aaj meri ek hi wish hai —
tum kabhi apni smile ko kisi ke liye mat khona.
Aur agar kabhi koi wajah tumhari smile chheen-ne ki koshish kare...
toh mujhe bula lena. 😌❤️

Happy Birthday to the person who somehow became one of my favourite parts of life. 🫶🏻🎂✨

Bas aaj ka din enjoy karo...
aur haan, cake ka ek piece mere naam ka bhi rakhna. 😂❤️`;"""

# Use dotall to match across newlines if any
content = re.sub(old_msg_pattern, new_msg.replace('\\', '\\\\'), content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated script.js with new message.")
