# Hybride Unternehmens-Web- und Mail-Infrastruktur

[English](README.md) | [Deutsch](README.de.md) | [فارسی](README.fa.md) | [العربية](README.ar.md)

## Hinweis zur anonymen Fallstudie

Dieses Repository ist eine anonyme Portfolio-Fallstudie. Es ist nicht die Produktionswebsite, kein Infrastruktur-Backup und kein Deployment-Repository. Unternehmensidentität, Domains, Hostnamen, Netzwerkadressen, Zugangsdaten, Konfigurationsexporte, Screenshots und Produktionsquellcode wurden bewusst entfernt.

## Überblick

Dieses Projekt präsentiert eine mehrsprachige GitHub-Pages-Fallstudie über ein von Milad abgeschlossenes Projekt für Web-, Mail- und hybride Netzwerkinfrastruktur. Es erklärt technische Entscheidungen, Verantwortlichkeiten und Betriebspraktiken für Website-Bereitstellung, Linux-Hosting, Unternehmensmail, sicheren externen Zugriff und intern geroutete Konnektivität.

## Projektherausforderung

Die Organisation benötigte eine wartbare Plattform für eine öffentliche Unternehmenswebsite, zentralisiertes Web- und Mailhosting, zuverlässigen internen und externen Zugriff, TLS-gesicherte Dienste, DNS-basierte Mailauthentifizierung, kontrollierte ausgehende Mailpfade, Backup-Bereitschaft und praktische Troubleshooting-Dokumentation.

## Meine Rolle

Milad entwarf und implementierte die Website-Schicht, stellte die Hosting-Umgebung bereit, administrierte Linux-Dienste, konfigurierte HestiaCP, Nginx, Exim, Dovecot und Roundcube, integrierte Reverse-Proxy-Verhalten, koordinierte DNS-Authentifizierung, konfigurierte sichere Konnektivitätskonzepte und dokumentierte Recovery-Abläufe.

## Verantwortlichkeiten

- Website-Design und Implementierung.
- Website-Deployment und Hosting-Administration.
- Linux-Serveradministration und Servicevalidierung.
- HestiaCP-, Nginx- und TLS-Management.
- Administration von Exim SMTP, Dovecot IMAP und Roundcube Webmail.
- Planung interner und externer Zugriffe.
- Integration von HAProxy, WireGuard und MikroTik RouterOS.
- Koordination von Firewall, NAT und Policy-Based Routing.
- Konzepte für domänenbasiertes ausgehendes SMTP-Routing.
- Backup-Planung, Monitoring, Troubleshooting und Recovery-Dokumentation.

## Architektur auf hoher Ebene

Die generalisierte Architektur umfasst externe Benutzer, interne Benutzer, Public DNS, einen European VPS, HAProxy, SMTP-Relay-Verhalten, einen sicheren WireGuard-Tunnel, einen MikroTik Edge Router, einen Reverse Proxy Server, einen HestiaCP Web- und Mailserver, Nginx, Exim, Dovecot, Roundcube, Backup Storage, Monitoring und Logs.

Es werden keine realen IP-Adressen, Domains, Hostnamen, Schnittstellennamen, Providernamen oder exakten Routingwerte veröffentlicht.

## Website- und Hosting-Arbeit

Der Webteil umfasst Präsentationsschicht, Linux-Hosting, HestiaCP-Administration, Nginx-Webhosting, Reverse-Proxy-Integration, HTTPS- und TLS-Management, statische Auslieferung und Health Checks nach Änderungen. Der Produktionsquellcode und Originalinhalte des Unternehmens sind nicht enthalten.

## Mail-Infrastruktur

Der Mailteil umfasst Exim SMTP, Dovecot IMAP, Roundcube Webmail, TLS-gesicherten Mailzugriff, interne und externe Postfachnutzung, DNS-Authentifizierung und kontrollierte ausgehende Zustellkonzepte. Milad konfigurierte, administrierte und troubleshootete diese Technologien; die Fallstudie behauptet nicht, dass er sie entwickelt hat.

## Interner und externer Zugriff

Interne Benutzer erreichten Dienste über den Organisationsnetzwerkpfad. Externe Benutzer erreichten ausgewählte öffentliche Einstiegspunkte über einen generalisierten European VPS und eine Proxy- oder Relay-Schicht. Die Beschreibung bleibt bewusst konzeptionell.

## Hybride Konnektivität

Das Projekt nutzte ein sicheres Tunnelkonzept zwischen Infrastrukturstandorten. MikroTik RouterOS übernahm Edge Routing, Firewall-Grenzen, NAT und Policy-Based Routing.

## Konzept für domänenbasiertes SMTP-Routing

Ausgehende Mail wurde mit getrennten direkten und relayed Pfaden geplant. Das Portfolio erklärt das Konzept ohne reale Domains, Selektoren, DNS-Werte, Zugangsdaten oder Relay-Konfiguration.

## DNS und Mailauthentifizierung

SPF, DKIM, DMARC, MX und PTR wurden als Konzepte für Mailidentität, Zustellbarkeit und Vertrauen berücksichtigt. Reale Record-Werte sind nicht enthalten.

## Sicherheitsansatz

Die Sicherheitsarbeit konzentrierte sich auf TLS, reduzierte Exposition, Firewall-Grenzen, Credential-Hygiene, Konfigurationstrennung, Privacy Review, Backup-Handhabung und sichere öffentliche Dokumentation.

## Backup und Recovery

Die Fallstudie erklärt Backup-Planung, Recovery-Validierung und einen Incident-Recovery-Prozess in bereinigter Form. Reale Logs, Dateisystempfade, Befehlsverläufe und unbestätigte Incident-Details werden vermieden.

## Troubleshooting

Troubleshooting wird als strukturierter Prozess dargestellt: Symptome beobachten, Schichten isolieren, Servicezustand prüfen, Ursachenkategorie identifizieren, Komponenten wiederherstellen, Verhalten validieren und vorbeugende Maßnahmen dokumentieren.

## Technologien

Web und Hosting: HTML, CSS, JavaScript, Linux, Ubuntu Server, HestiaCP, Nginx, TLS.

Mail: Exim, Dovecot, Roundcube, SMTP, IMAP, SPF, DKIM, DMARC, MX, PTR.

Netzwerk: MikroTik RouterOS, WireGuard, HAProxy, NAT, Firewall, Policy-Based Routing, DNS, TCP/IP.

Betrieb: Bash, Logging, Monitoring, Backup, Incident Recovery, Troubleshooting und technische Dokumentation.

## Nachgewiesene Fähigkeiten

End-to-End-Infrastrukturverantwortung, schichtenübergreifendes Troubleshooting, Linux-Administration, Mailinfrastruktur, Netzwerk-Engineering, sicherer Remote-Zugriff, Reverse-Proxy-Konfiguration, SMTP-Routing, DNS-Management, TLS-Management, Backup-Planung, Incident Recovery und technische Dokumentation.

## Repository-Struktur

Das Repository enthält eine mehrsprachige statische Website, Locale-Dateien, Dokumentation, Mermaid-Diagramme, Privacy-Scanner, Validierungsskripte und GitHub-Workflows für Pages und Qualitätssicherung.

## Portfolio lokal ausführen

Da Übersetzungen aus JSON-Dateien geladen werden, sollte ein lokaler HTTP-Server verwendet werden:

```bash
python3 -m http.server 8080
```

Danach den lokalen Server im Browser öffnen. Direktes Öffnen über `file://` kann JSON-Dateien je nach Browser blockieren.

## Datenschutz und Vertraulichkeit

Dieses Repository ist für die öffentliche Portfolio-Prüfung bereinigt. Es enthält keine Unternehmensidentität, Produktionswebsite, Domains, Hostnamen, IP-Adressen, Zugangsdaten, Schlüssel, DNS-Werte, Screenshots, Postfachdaten, Backups, Logs oder Konfigurationsexporte.

## Autor

Milad  
IT Infrastructure and DevOps Engineer
