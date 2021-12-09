
package com.mycompany.login.agente;

import org.apache.commons.dbcp2.BasicDataSource;

public class conectaBD {
    
     private final BasicDataSource bancoDeDados;
     
     public conectaBD() {
        this.bancoDeDados = new BasicDataSource();
        this.bancoDeDados.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        this.bancoDeDados.setUrl("jdbc:sqlserver://totem-hub-server.database.windows.net:1433;database=totemHub;"
                + "encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;"); // Link e porta do Azure
        this.bancoDeDados.setUsername("totemHub");
        this.bancoDeDados.setPassword("#Gfgrupo2");
    }
     
    public BasicDataSource getBancoDeDados() {
        return bancoDeDados;
    }
}
