import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import StarIcon from 'material-ui-icons/Star';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button/Button';
import SimpleModal from './Answer';
import { queryData } from './request';
import Textarea from 'material-ui/Input/Textarea';
const styles = theme => ({
    root: {
        width: '98%',
        marginLeft: '1%',
        marginRight: '1%',
        backgroundColor: theme.palette.background.paper,
    },
});

// {
//     "answers": [
//         {
//             "aid": 3,
//             "answeredby": 13,
//             "timestamp": "2018-02-14T10:06:25.114913+00:00",
//             "question": 5,
//             "description": "First, let me say that I am not a lawyer but do have extensive experience with website security and automated threats like web scraping. As VP of Marketing with Distil Networks–the experts at protecting web sites, mobile apps, and APIs from automated attacks–I’ve been on the front lines in the fight against malicious web scrapers.  Depending on how it’s used, web scraping can either a blessing or a curse. But is web scraping actually illegal?  On one hand, web scraping with “good bots” enables search engines to index web content, price comparison services to save consumers money, and market researchers to gauge sentiment on social media.  On the other hand, web scraping can be re-targeted and transformed for more malicious and abusive ends. Web scraping can align with other forms of malicious automation, otherwise known as “bad bots,” which enable other harmful activities, such as denial of service attacks, competitive data mining, online fraud, account hijacking, data theft, stealing of intellectual property, unauthorized vulnerability scans, spam, and digital ad fraud.  So again we ask, is web scraping actually illegal? Well, yes and no. It’s a grey area that tends to evolve as time goes on. Although web scrapers technically speed up the process of clicking, loading, copying, and pasting information that is easily accessible to anyone browsing the web, web scraping is also the key culprit behind copyright violations, violated terms of use, and other web activity that is highly disruptive to a company’s business.  Let’s trace a few key legal findings that found web scraping on the wrong side of the law:  2000 eBay v. Bidder’s Edge (*settled out of court) 2009 Facebook v. Power.com 2010 Cvent, Inc. v. Eventbrite, Inc. 2013 The Associated Press v. Meltwater U.S. Holdings Then, in 2016, Congress passed the Better Online Ticket Sales (BOTS) Act, banning the use of software that circumvents security measures on ticket seller websites. This stands as the first legislation specifically to target bad bots passed by Congress, and was a huge step forward in the fight against automated ticket scalping bots. These bad bots use several techniques to do their dirty work including web scraping that incorporates advanced business logic to identify scalping opportunities, input purchase details into shopping carts, and even resell inventory on secondary markets.  To counteract this type of activity, the BOTS Act:  Prohibits the circumvention of a security measure used to enforce ticket purchasing limits for an event with an attendance capacity of greater than 200 persons. Prohibits the sale of an event ticket obtained through such a circumvention violation if the seller participated in, had the ability to control, or should have known about it. Treats violations as unfair or deceptive acts under the Federal Trade Commission Act. The bill provides authority to the FTC and states to enforce against such violations. In other words, if you’re a venue, organization or ticketing software platform, it is still on you to defend against this fraudulent activity during your major onsales.  Yet, are the existing laws too antiquated to deal with the problem? Should new legislation be introduced to provide more clarity? Most sites don’t have any web scraping protections in place. Do the companies have some burden to prevent web scraping?  As the courts try to further decide the legality of scraping, companies are still having their data stolen and the business logic of their websites abused. Instead of looking to the law to eventually solve this technology problem, it’s time to start solving it with anti-bot and anti-scraping technology.  No matter where the legal line is currently drawn in the sand, it’s best to look into protective measures against malicious web scraping and other automated attacks. Just because an intent or a certain form of scraping hasn’t been outlawed doesn’t mean you can’t protect your servers, APIs, and content. Check out a bit more information on web scraping, or send me a DM if you have any specific questions"
//         }
//     ],
//     "tagsrel": [
//         {
//             "tid": 2,
//             "name": "TECHNICAL",
//             "datastamp": "2018-02-14T10:09:39.35755+00:00",
//             "question": 5
//         }
//     ],
//     "askedbyrel": {
//         "uid": 15,
//         "college": "SSEC",
//         "branch": "CSE",
//         "name": "SAURAB TOPPO",
//         "semster": "4"
//     },
//     "statement": "How do I learn the programming language in Git hub?",
//     "qid": 5,
//     "askedby": 15,
//     "timestamp": "2018-02-14T09:49:27.33707+00:00"
// }

class Post extends React.Component {

    state = {
        votes : Math.round(Math.random()*120)
    }

    onUpvote(){

        

    }

    onDownvote(){

    }

   
    render() {

        return <Card style={
            {
                width: '98%',
                padding: '1%'
            }
        } onClick={
            this.props.onClick
        }>


            <div style={


                {
                    width: '100%',
                    padding: '4px',
                    margin: '4px'
                }

            }>

                <h1> {
                    this.props.que
                }
                </h1>
                <p>
                    <br />
                    {
                        this.props.ans
                    }
                </p>
                <br />
                {
                    this.props.votes
                }
                <br />

                <Button style={{
                    color: 'blue'
                }} onClick={(e) => {

                    this.setState({
                        votes : this.state.votes+1
                    })

                    e.preventDefault();
                    e.stopPropagation();

                   

                }}>upvote ({this.state.votes})</Button>
                <Button style={{
                    color: 'red'
                }}
                onClick={(e) => {

                    this.setState({
                        votes : this.state.votes-1
                    })

                    e.preventDefault();
                    e.stopPropagation();

                   

                }}
                >downvote  </Button>
                <Button style={{
                    color: 'blue'
                }}
                    >comment</Button>

                    <br/>


            </div>

        </Card>;

    }
}

export {Post}


class InsetList extends React.Component {


    componentDidMount(){


        queryData({
            "type": "select",
            "args": {
                "table": "question",
                "columns": [
                    "*",
                    {
                        "name": "answers",
                        "columns": [
                            "*"
                        ]
                    },
                    {
                        "name": "tagsrel",
                        "columns": [
                            "*"
                        ]
                    },
                    {
                        "name": "askedbyrel",
                        "columns": [
                            "*"
                        ]
                    }
                ],
                "where": {}
            }
        },'Bearer 727db6429db60f53c524dc0eb16e7dbf902b78fd93a55003').then(
           e=> {
            this.setState({
                data : e.data
            })
           }
        ).catch(x=>{

            alert('network error please refresh this page')

        });


    }

    state = {
        posts: [
            "", "", "", "", "", ""
        ],
        aopen : false,
        data : []
    }
    render(props) {
        const { classes } = this.props;
        return (
            <div className={classes.root}>

                <SimpleModal open = {this.state.aopen} onClose = {
                    (c)=>{
                        this.setState({
                            aopen : false
                        })
                    }

                } queId = {this.state.queid} data={this.state.data}/>

                <List component="nav">


                    {
                        this.state.data.map((q,i) => {

                            return <ListItem button >
                                <Post que={q.statement} ans={q.answers[0] && q.answers[0].description} post="sdg" tags onClick={() => {
                                    
                                    this.setState({
                                        aopen : true,
                                        queid : i
                                    })




                                }} />
                            </ListItem>
                        })
                    }

                </List>
            </div>
        );
    }
}

InsetList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetList);