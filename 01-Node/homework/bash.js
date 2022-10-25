const commands = require("./commands");

const print = (output) => {
    process.stdout.write(output)
    process.stdout.write("\nprompt > ");
}

process.stdout.write('prompt > ');

process.stdin.on('data', (data) => {

    let args = data.toString().trim().split(' ');
    let cmd = args.shift();
    if (commands[cmd])
        commands[cmd](args, print);
    else
        print('Command not found')
});
