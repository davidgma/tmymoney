
### Termux

[Termux](https://termux.com) is an amazing Android app that creates a Linux terminal inside of Android. It actually allows you to do pretty much all of the things inside the terminal discussed in this documentation and it doesn't even need root access.

Termux uses pkg as a package manager and the following can be installed.

```
pkg install neovim git tmux bc xsel ranger man nodejs-lts python clang python-dev vim-python openssh 
pip3 install --user pynvim

# If you have an SD card 
termux-setup-storage  
```

Note that to set up SSH to the VM, don't use the metadata section of the Google Cloud Console, but instead, use the [os-login feature](https://cloud.google.com/compute/docs/instances/managing-instance-access). Copy the .pub file to the Google Cloud Shell using upload, and then put it in the ssh directory there and use a command in the Cloud Shell to set it up.

In the Google Cloud Shell: 

```
cd ssh
gcloud compute os-login ssh-keys add --key-file t700_id_rsa.p
ub 
```

Then in Termux:

```
ssh-keygen -t rsa -C dmlh02_gmail_com
# then upload the .pub key file to the Cloud Shell and add the key

ssh dmlh02_gmail_com@vm.davidgma.com 
```



