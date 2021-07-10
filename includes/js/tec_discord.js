/*
 * Creates a Discord link to join the community channel bellow the normal social media links
 */
function discordButton() {
    try {
        var originalList = document.getElementsByClassName('dpsp-networks-btns-wrapper dpsp-networks-btns-share dpsp-networks-btns-sidebar  dpsp-has-button-icon-animation')[0].getElementsByTagName("li")[3].innerHTML;
        document.getElementsByClassName('dpsp-networks-btns-wrapper dpsp-networks-btns-share dpsp-networks-btns-sidebar  dpsp-has-button-icon-animation')[0].getElementsByTagName("li")[3].innerHTML = originalList + '</li><li class=""><a rel="nofollow noopener" href="https://discord.gg/UHz6CDz" class="dpsp-network-btn dpsp-no-label dpsp-last" target="_blank" aria-label="Community Discord" title="Community Discord Invite" style="background-color: rgb(114, 137, 218) !important; border-color: rgb(114, 137, 218) !important; --networkColor: rgba(114, 137, 218, 0.4) !important; --networkHover: rgba(114, 137, 218, 0.4) !important; border-bottom-right-radius: 0px;"><span class="dpsp-network-icon"><span class="dpsp-network-icon-inner"><img viewBox="0 0 30 32" src="https://tanks-encyclopedia.com/wp-content/uploads/2020/07/DiscordLogoNew.png" style="height: 16px; width: 16px;"></span></span></a>';
        //corrects printing function removed by Discord button addition. Note: Inconsistent infinite print option openning
        document.getElementsByClassName('dpsp-networks-btns-wrapper dpsp-networks-btns-share dpsp-networks-btns-sidebar  dpsp-has-button-icon-animation')[0].getElementsByTagName("li")[5].innerHTML = '<a rel="nofollow noopener" href="#" class="dpsp-network-btn dpsp-print dpsp-no-label dpsp-last" target="_blank" aria-label="Print this webpage" title="Print this webpage" onclick="window.print(); return false;"><span class="dpsp-network-icon"><span class="dpsp-network-icon-inner"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="32" viewBox="0 0 30 32"><path d="M27.712 9.152c1.28 0 2.4 1.12 2.4 2.496v11.712c0 1.344-1.12 2.464-2.4 2.464h-2.432l1.088 4.896h-22.112l0.864-4.896h-2.624c-1.44 0-2.496-1.12-2.496-2.464v-11.712c0-1.376 1.056-2.496 2.496-2.496h3.072v-3.744h1.088v-4.128h16.864v4.128h1.088v3.744h3.104zM7.776 2.784v9.344h14.624v-9.344h-14.624zM4.16 15.232c0.96 0 1.76-0.768 1.76-1.728 0-0.896-0.8-1.696-1.76-1.696-0.928 0-1.728 0.8-1.728 1.696 0 0.96 0.8 1.728 1.728 1.728zM6.176 29.248h18.144l-1.504-7.744h-15.488zM14.24 25.632h-4.448v-1.12h4.448v1.12zM20.576 25.632h-4.448v-1.12h4.448v1.12z"></path></svg></span></span></a>';
    } catch(e) {
        //discord button failed to load. Just in case something goes wrong, doesn't break the rest of the javascript
    }
}

discordButton();