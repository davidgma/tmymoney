
### unison file synchroniser

I keep the master copy of my KMyMoney file on the GCP VM and then synchronise it to a local copy before and after each time I use KMyMoney on a local machine. That way, any changes made on any machine, or on the VM, will be kept.

To install unison:
```
sudo apt install unison
```

On the local machine with a gui:
```
sudo apt install unison-gtk
```

Then, on the local machine, open the GUI and set up a sync profile between the local folder and the ssh folder on the VM. I called it kmymoney-vm. I ran it once manually to check it worked.

Then create a bash script to do the syncs before and after opening KMyMoney.

```bash
#!/bin/bash
# Use KMyMoney with a sync to the GCP VM

# Sync with the VM
echo Syncing with the VM
unison kmymoney-vm -auto -batch -silent -ui text

# Run KMyMoney
echo Opening KMyMoney
kmymoney $1

# Sync with the VM
echo Syncing with the VM
unison kmymoney-vm -auto -batch -silent -ui text

```

Then create a new .desktop file in ~/.local/share/applications/ based on a copy of /usr/share/applications/org.kde.kmymoney.desktop. Change a few of the lines as follows:

```
Name=KMyMoney With Sync
Name[en_GB]=KMyMoney With Sync
GenericName=Personal Finance Manager with Sync
GenericName[en_GB]=With Sync to VM
Exec=/home/david/local/scripts/63-kmymoney %u
Comment=Personal Finance Manager with Sync
Comment[en_GB]=Personal Finance Manager with sync
```