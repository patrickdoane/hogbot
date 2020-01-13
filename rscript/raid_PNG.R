#!/usr/bin/env Rscript

#Imports
require(ggplot2)
#--#

args = commandArgs(trailingOnly=TRUE)

#Do Stuff
basic_theme<-theme(
    legend.position='none',
    plot.tag.position=c(0.02,.98),
    panel.background=element_rect(fill='black'),
    panel.grid.major=element_blank(),panel.grid.minor=element_blank(),
    plot.tag=element_text(colour='black',size=20,face='plain'),
    axis.text=element_blank(),axis.ticks=element_blank(),
    axis.title=element_blank(),strip.text = element_text(size=25),
    plot.title=element_text(hjust=0.5,colour='black',size=30,face='plain'),
    axis.line=element_line(colour='black',size=1))

data <- read.csv(args[1])
data$group <- factor(data$group)
data$dummy <- rep(0, nrow(data))
pal <- c('#FF7D0A','#ABD473','#69CCF0','#FFFFFF','#FFF569','#0070DE','#9482C9','#C79C6E')

adjust<- function(numb){return(abs(numb-6))}

plot <- ggplot(data,aes(dummy,adjust(position),label=name,,color=class))+
    geom_text(size=7.5,fontface = "bold")+basic_theme+xlim(-0.2,0.2)+ylim(0,6)+labs(title='Raid Setup')+
    facet_wrap(~group,scales = "free",ncol=4)+
    scale_color_manual(values=pal)

png(paste(args[2],sep=''),height=400,width=1000)
plot
dev.off()
#--#